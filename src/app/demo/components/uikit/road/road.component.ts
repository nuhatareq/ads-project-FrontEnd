import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { PaymentMethods } from '../../../../models/PaymentMethods';
import { Product } from '../../../api/product';
import { Road } from '../../../../models/road';

@Component({
    selector: 'app-road',
    templateUrl: './road.component.html',
    styleUrls: ['./road.component.scss'],
})
export class RoadComponent implements OnInit {
    roads: Road[] = [];
    addRoad!: FormGroup;
    productDialog: boolean = false;
    isEdit: boolean = false;

    deleteProductDialog: boolean = false;

    product: Product = {};

    road: Road = {};

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
        this.getallRoads();
        this.cols = [
            { field: 'options', header: 'options' },
            { field: 'name', header: 'name' },
        ];
        this.addRoad = this.fb.group({
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
        this.addRoad.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
    }

    editProduct(road: Road) {
        this.road = { ...road };
        this.productDialog = true;
        this.isEdit = true;
        this.addRoad.controls['name'].setValue(this.road.name);
    }

    deleteProduct(road: Road) {
        this.deleteProductDialog = true;
        this.road = { ...road };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.deleteSelectedRoad();

        this.road = {};
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
        this.addRoad.reset();
    }

    getallRoads() {
        this.apiServices.GetMethod('Road').subscribe({
            next: (data: Road[]) => {
                this.roads = data;
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
            name: this.addRoad.controls['name'].value,
        };
        this.apiServices.PostMethod('Road', body).subscribe({
            next: () => {
                this.getallRoads();
                this.touster.success('تم الاضافة بنجاح');
                this.submitted = false;
                this.productDialog = false;
                this.addRoad.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    deleteSelectedRoad() {
        this.apiServices.DeleteMethod(`Road/${this.road.id}`, '').subscribe({
            next: () => {
                this.touster.success('تم الحذف بنجاح');
                this.getallRoads();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    updateSelectedRoad() {
        const body = {
            id: this.road.id,
            name: this.addRoad.controls['name'].value,
        };
        this.apiServices.UpdateMethodWithPipe('Road', body).subscribe({
            next: () => {
                this.getallRoads();
                this.touster.success('تم التعديل بنجاح');
                this.isEdit = false;
                this.productDialog = false;
                this.road = {};
                this.addRoad.reset();
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
        });
    }
}
