import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { Product } from '../../../api/product';
import { RegionType } from '../../../../models/region';

@Component({
    selector: 'app-regionType',
    templateUrl: './regionType.component.html',
    styleUrls: ['./regionType.component.scss'],
})
export class RegionTypeComponent implements OnInit {
    regionTypes: RegionType[] = [];
    addRegionType!: FormGroup;
    productDialog: boolean = false;
    isEdit: boolean = false;

    deleteProductDialog: boolean = false;

    product: Product = {};

    regionType: RegionType = {};

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
        this.getallRegionTypes();
        this.cols = [
            { field: 'options', header: 'options' },
            { field: 'name', header: 'name' },
        ];
        this.addRegionType = this.fb.group({
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
        this.addRegionType.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
    }

    editProduct(regionType: RegionType) {
        this.regionType = { ...regionType };
        this.productDialog = true;
        this.isEdit = true;
        this.addRegionType.controls['name'].setValue(this.regionType.name);
    }

    deleteProduct(regionType: RegionType) {
        this.deleteProductDialog = true;
        this.regionType = { ...regionType };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.deleteSelectedRegionType();
        this.regionType = {};
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
        this.addRegionType.reset();
    }

    getallRegionTypes() {
        this.apiServices.GetMethod('RegionType').subscribe({
            next: (data: RegionType[]) => {
                this.regionTypes = data;
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
            name: this.addRegionType.controls['name'].value,
        };
        this.apiServices.PostMethod('RegionType', body).subscribe({
            next: () => {
                this.getallRegionTypes();
                this.touster.success('تم الاضافة بنجاح');
                this.submitted = false;
                this.productDialog = false;
                this.addRegionType.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    deleteSelectedRegionType() {
        this.apiServices
            .DeleteMethod(`RegionType/${this.regionType.id}`, '')
            .subscribe({
                next: () => {
                    this.touster.success('تم الحذف بنجاح');
                    this.getallRegionTypes();
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    console.log(error);
                },
                complete: () => {},
            });
    }

    updateSelectedRegionType() {
        const body = {
            id: this.regionType.id,
            name: this.addRegionType.controls['name'].value,
        };
        this.apiServices.UpdateMethodWithPipe('RegionType', body).subscribe({
            next: () => {
                this.getallRegionTypes();
                this.touster.success('تم التعديل بنجاح');
                this.isEdit = false;
                this.productDialog = false;
                this.regionType = {};
                this.addRegionType.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
        });
    }
}
