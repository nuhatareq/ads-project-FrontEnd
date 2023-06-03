import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { PaymentMethods } from '../../../../models/PaymentMethods';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-paymentMethod',
    templateUrl: './paymentMethod.component.html',
    styleUrls: ['./paymentMethod.component.css'],
    providers: [MessageService],
})
export class PaymentMethodComponent implements OnInit {
    paymentMethods: PaymentMethods[] = [];
    addPaymentMethod!: FormGroup;
    productDialog: boolean = false;
    isEdit: boolean = false;

    deleteProductDialog: boolean = false;

    product: Product = {};

    paymentmethod: PaymentMethods = {};

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
        this.getallPaymentMethods();
        this.cols = [
            { field: 'options', header: 'options' },
            { field: 'name', header: 'name' },
        ];
        this.addPaymentMethod = this.fb.group({
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
        this.addPaymentMethod.reset();
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
    }

    editProduct(paymentMethod: PaymentMethods) {
        this.paymentmethod = { ...paymentMethod };
        this.productDialog = true;
        this.isEdit = true;
        this.addPaymentMethod.controls['name'].setValue(
            this.paymentmethod.name
        );
    }

    deleteProduct(paymentMethod: PaymentMethods) {
        this.deleteProductDialog = true;
        this.paymentmethod = { ...paymentMethod };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.deleteSelectedPaymentMethod();

        this.paymentmethod = {};
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
        this.addPaymentMethod.reset();
    }

    getallPaymentMethods() {
        this.apiServices.GetMethod('PaymentMethod').subscribe({
            next: (data: PaymentMethods[]) => {
                this.paymentMethods = data;
            },
            error: (error) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    save() {
        const body = {
            name: this.addPaymentMethod.controls['name'].value,
        };
        this.apiServices.PostMethod('PaymentMethod', body).subscribe({
            next: () => {
                this.getallPaymentMethods();
                this.touster.success('تم الاضافة بنجاح');
                this.submitted = false;
                this.productDialog = false;
                this.addPaymentMethod.reset();
            },
            error: (error) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    deleteSelectedPaymentMethod() {
        this.apiServices
            .DeleteMethod(`PaymentMethod/${this.paymentmethod.id}`, '')
            .subscribe({
                next: () => {
                    this.touster.success('تم الحذف بنجاح');
                    this.getallPaymentMethods();
                },
                error: (error) => {
                    this.touster.error('عملية خاطئة');
                    console.log(error);
                },
                complete: () => {},
            });
    }

    updateSelectedPaymentMethod() {
        const body = {
            id: this.paymentmethod.id,
            name: this.addPaymentMethod.controls['name'].value,
        };
        this.apiServices.UpdateMethodWithPipe('PaymentMethod', body).subscribe({
            next: () => {
                this.getallPaymentMethods();
                this.touster.success('تم التعديل بنجاح');
                this.isEdit = false;
                this.productDialog = false;
                this.paymentmethod = {};
                this.addPaymentMethod.reset();
            },
            error: (error) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
        });
    }
}
