import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { PaymentMethods } from '../../../../models/PaymentMethods';
import { AdType } from '../../../../models/ad';
import { Product } from '../../../api/product';
import { Region } from '../../../../models/region';

@Component({
    selector: 'app-region',
    templateUrl: './region.component.html',
    styleUrls: ['./region.component.scss'],
})
export class RegionComponent implements OnInit {
    regions: Region[] = [];
    addRegion!: FormGroup;
    productDialog: boolean = false;
    isEdit: boolean = false;

    deleteProductDialog: boolean = false;

    product: Product = {};

    Region: AdType = {};

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
        this.getallRegions();
        this.cols = [
            { field: 'options', header: 'options' },
            { field: 'name', header: 'name' },
        ];
        this.addRegion = this.fb.group({
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
        this.addRegion.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
    }

    editProduct(region: Region) {
        this.Region = { ...region };
        this.productDialog = true;
        this.isEdit = true;
        this.addRegion.controls['name'].setValue(this.Region.name);
    }

    deleteProduct(region: Region) {
        this.deleteProductDialog = true;
        this.Region = { ...region };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.deleteSelectedRegion();

        this.Region = {};
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
        this.addRegion.reset();
    }

    getallRegions() {
        this.apiServices.GetMethod('Region').subscribe({
            next: (data: Region[]) => {
                this.regions = data;
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
            name: this.addRegion.controls['name'].value,
        };
        this.apiServices.PostMethod('Region', body).subscribe({
            next: () => {
                this.getallRegions();
                this.touster.success('تم الاضافة بنجاح');
                this.submitted = false;
                this.productDialog = false;
                this.addRegion.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    deleteSelectedRegion() {
        this.apiServices
            .DeleteMethod(`Region/${this.Region.id}`, '')
            .subscribe({
                next: () => {
                    this.touster.success('تم الحذف بنجاح');
                    this.getallRegions();
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    console.log(error);
                },
                complete: () => {},
            });
    }

    updateSelectedRegion() {
        const body = {
            id: this.Region.id,
            name: this.addRegion.controls['name'].value,
        };
        this.apiServices.UpdateMethodWithPipe('Region', body).subscribe({
            next: () => {
                this.getallRegions();
                this.touster.success('تم التعديل بنجاح');
                this.isEdit = false;
                this.productDialog = false;
                this.Region = {};
                this.addRegion.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
        });
    }
}
