import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { PaymentMethods } from '../../../../models/PaymentMethods';
import { Product } from '../../../api/product';
import { JobTitle } from '../../../../models/jobTitle';

@Component({
    selector: 'app-jobTitle',
    templateUrl: './jobTitle.component.html',
    styleUrls: ['./jobTitle.component.scss'],
})
export class JobTitleComponent implements OnInit {
    jobTitles: JobTitle[] = [];
    addJobTitle!: FormGroup;
    productDialog: boolean = false;
    isEdit: boolean = false;

    deleteProductDialog: boolean = false;

    product: Product = {};

    jobTitle: JobTitle = {};

    submitted: boolean = false;

    cols: any[] = [];
    headers: Array<string> = ['الاسم  ', 'خيارات'];
    keys: Array<string> = ['name'];
    constructor(
        private apiServices: HttpServicesService,
        private fb: FormBuilder,
        private touster: ToastrService
    ) {}

    ngOnInit() {
        this.getallJobs();
        this.cols = [
            { field: 'options', header: 'options' },
            { field: 'name', header: 'name' },
        ];
        this.addJobTitle = this.fb.group({
            name: [
                null,
                [
                    Validators.required,
                    Validators.pattern('^[\u0621-\u064A-/ ]+$'),
                ],
            ],
        });
    }

    openNew() {
        this.addJobTitle.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
    }

    editProduct(jibTitle: JobTitle) {
        this.jobTitle = { ...jibTitle };
        this.productDialog = true;
        this.isEdit = true;
        this.addJobTitle.controls['name'].setValue(this.jobTitle.name);
    }

    deleteProduct(jibTitle: JobTitle) {
        this.deleteProductDialog = true;
        this.jobTitle = { ...jibTitle };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.deleteSelectedJobTitle();

        this.jobTitle = {};
    }

    onGlobalFilter(event: any) {
        event.table.filterGlobal(
            (event.event.target as HTMLInputElement).value,
            'contains'
        );
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.addJobTitle.reset();
    }

    getallJobs() {
        this.apiServices.GetMethod('JobTitle').subscribe({
            next: (data: JobTitle[]) => {
                this.jobTitles = data;
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    save() {
        const body = {
            name: this.addJobTitle.controls['name'].value,
        };
        this.apiServices.PostMethod('JobTitle', body).subscribe({
            next: () => {
                this.getallJobs();
                this.touster.success('تم الاضافة بنجاح');
                this.submitted = false;
                this.productDialog = false;
                this.addJobTitle.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    deleteSelectedJobTitle() {
        this.apiServices
            .DeleteMethod(`JobTitle/${this.jobTitle.id}`, '')
            .subscribe({
                next: () => {
                    this.touster.success('تم الحذف بنجاح');
                    this.getallJobs();
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    console.log(error);
                },
                complete: () => {},
            });
    }

    updateSelectedJobTitle() {
        const body = {
            id: this.jobTitle.id,
            name: this.addJobTitle.controls['name'].value,
        };
        this.apiServices.UpdateMethodWithPipe('JobTitle', body).subscribe({
            next: () => {
                this.getallJobs();
                this.touster.success('تم التعديل بنجاح');
                this.isEdit = false;
                this.productDialog = false;
                this.jobTitle = {};
                this.addJobTitle.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
        });
    }
}
