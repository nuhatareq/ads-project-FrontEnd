import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { AdType } from '../../../../models/ad';
import { Product } from '../../../api/product';

@Component({
    selector: 'app-adType',
    templateUrl: './adType.component.html',
    styleUrls: ['./adType.component.scss'],
})
export class AdTypeComponent implements OnInit {
    adtypes: AdType[] = [];
    addAdtype!: FormGroup;
    productDialog: boolean = false;
    isEdit: boolean = false;

    deleteProductDialog: boolean = false;

    product: Product = {};

    adType: AdType = {};

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
        this.getallAdTypes();
        this.cols = [
            { field: 'options', header: 'options' },
            { field: 'name', header: 'name' },
        ];
        this.addAdtype = this.fb.group({
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
        this.addAdtype.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
    }

    editProduct(adType: AdType) {
        this.adType = { ...adType };
        this.productDialog = true;
        this.isEdit = true;
        this.addAdtype.controls['name'].setValue(this.adType.name);
    }

    deleteProduct(adType: AdType) {
        this.deleteProductDialog = true;
        this.adType = { ...adType };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.deleteSelectedAdtype();

        this.adType = {};
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
        this.addAdtype.reset();
    }

    getallAdTypes() {
        this.apiServices.GetMethod('AdType/GetAll').subscribe({
            next: (data: AdType[]) => {
                this.adtypes = data;
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
            name: this.addAdtype.controls['name'].value,
        };
        this.apiServices.PostMethod('AdType/AddAdType', body).subscribe({
            next: () => {
                this.getallAdTypes();
                this.touster.success('تم الاضافة بنجاح');
                this.submitted = false;
                this.productDialog = false;
                this.addAdtype.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    deleteSelectedAdtype() {
        this.apiServices
            .DeleteMethod(`AdType/${this.adType.id}`, '')
            .subscribe({
                next: () => {
                    this.touster.success('تم الحذف بنجاح');
                    this.getallAdTypes();
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    console.log(error);
                },
                complete: () => {},
            });
    }

    updateSelectedAdType() {
        const body = {
            id: this.adType.id,
            name: this.addAdtype.controls['name'].value,
        };
        this.apiServices.UpdateMethodWithPipe('AdType', body).subscribe({
            next: () => {
                this.getallAdTypes();
                this.touster.success('تم التعديل بنجاح');
                this.isEdit = false;
                this.productDialog = false;
                this.adType = {};
                this.addAdtype.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
        });
    }
}
