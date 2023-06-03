import { Component, OnInit } from '@angular/core';
import { AdCategory } from '../../../../models/ad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../api/product';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethods } from '../../../../models/PaymentMethods';

@Component({
    selector: 'app-adCategory',
    templateUrl: './adCategory.component.html',
    styleUrls: ['./adCategory.component.css'],
})
export class AdCategoryComponent implements OnInit {
    adCategories: AdCategory[] = [];
    addAdCategory!: FormGroup;
    productDialog: boolean = false;
    isEdit: boolean = false;

    deleteProductDialog: boolean = false;

    product: Product = {};

    adCategory: AdCategory = {};

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
        this.getallAdCategories();
        this.cols = [
            { field: 'name', header: 'name' },
            { field: 'options', header: 'options' },
        ];
        this.addAdCategory = this.fb.group({
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
        this.addAdCategory.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
    }

    editProduct(adCategory: AdCategory) {
        this.adCategory = { ...adCategory };
        this.productDialog = true;
        this.isEdit = true;
        this.addAdCategory.controls['name'].setValue(this.adCategory.name);
    }

    deleteProduct(adCategory: AdCategory) {
        this.deleteProductDialog = true;
        this.adCategory = { ...adCategory };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.deleteSelectedAdCategory();

        this.adCategory = {};
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
        this.addAdCategory.reset();
    }

    getallAdCategories() {
        this.apiServices.GetMethod('AdCategory').subscribe({
            next: (data: AdCategory[]) => {
                this.adCategories = data;
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
            name: this.addAdCategory.controls['name'].value,
        };
        this.apiServices.PostMethod('AdCategory', body).subscribe({
            next: () => {
                this.getallAdCategories();
                this.touster.success('تم الاضافة بنجاح');
                this.submitted = false;
                this.productDialog = false;
                this.addAdCategory.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    deleteSelectedAdCategory() {
        this.apiServices
            .DeleteMethod(`AdCategory/${this.adCategory.id}`, '')
            .subscribe({
                next: () => {
                    this.touster.success('تم الحذف بنجاح');
                    this.getallAdCategories();
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    console.log(error);
                },
                complete: () => {},
            });
    }

    updateSelecteAdCategory() {
        const body = {
            id: this.adCategory.id,
            name: this.addAdCategory.controls['name'].value,
        };
        this.apiServices.UpdateMethodWithPipe('AdCategory', body).subscribe({
            next: () => {
                this.getallAdCategories();
                this.touster.success('تم التعديل بنجاح');
                this.isEdit = false;
                this.productDialog = false;
                this.adCategory = {};
                this.addAdCategory.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
        });
    }
}
