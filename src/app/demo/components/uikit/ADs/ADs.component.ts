import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { Company } from '../../../../models/company';
import { Region } from '../../../../models/region';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Road } from '../../../../models/road';
import { Ad, AdCategory, AdType } from '../../../../models/ad';
import { PaymentMethods } from '../../../../models/PaymentMethods';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-ADs',
    templateUrl: './ADs.component.html',
    styleUrls: ['./ADs.component.scss'],
})
export class ADsComponent implements OnInit {
    allCompanies: Company[] = [];
    allRegions: Region[] = [];
    allRoads: Road[] = [];
    allAdTypes: AdType[] = [];
    allAds: Ad[] = [];
    allPaymentMethods: PaymentMethods[] = [];
    allADs: any[] = [];
    adForm!: FormGroup;
    previewForm!: FormGroup;
    paymentDetailsForm!: FormGroup;
    pageNumber: number = 1;
    adsHeadsTable: string[] = [
        'المنطقة',
        'الطريق',
        'الموقع',
        'وصف الموقع',
        'تصنيف الاعلان',
        'نوع الاعلان',
        'عدد الاوجه',
        'خيارات',
    ];
    keys: Array<any> = [
        'region',
        'road',
        'location',
        'siteDescription',
        'adCategory',
        'adType',
        'numberOfFaces',
    ];

    cols: any[] = [];
    showPaymentMethodDetailsForm: boolean = false;
    constructor(
        private apiServices: HttpServicesService,
        private touster: ToastrService
    ) {}
    ngOnInit() {
        this.initPreviewForm();
        this.getallCompanies();
        this.getallRegions();
        this.initAdForm();
        this.getallAdTypes();
        this.getallRoads();
        this.getallPaymentMethods();
        this.cols = [
            { field: 'regionId', header: 'regionId' },
            {
                field: 'roadId',
                header: 'roadId',
            },
            { field: 'location', header: 'location' },
            { field: 'siteDescription', header: 'siteDescription' },
            { field: 'adCategoryId', header: 'adCategoryId' },
            { field: 'adTypeId', header: 'adTypeId' },
            { field: 'numberOfFaces', header: 'numberOfFaces' },
            { field: 'options', header: 'options' },
        ];
        // this.initPaymentDetailsForm();
    }

    async addAdtoFormArray() {
        await this.getAdCategoryIdByAdTypeId(this.adTypeId.value);
        let body = {
            region: this.previewForm.controls['regionIdd'].value.name,
            road: this.adForm.controls['roadIdd'].value.name,
            location: this.adForm.controls['location'].value,
            siteDescription: this.adForm.controls['siteDescription'].value,
            adCategory: this.categoryData.name,
            adType: this.adForm.controls['adTypeIdd'].value.name,
            numberOfFaces: this.adForm.controls['numberOfFaces'].value,
        };
        this.ads.push(this.adForm);
        this.allADs.push(body);
        this.initAdForm();
    }

    returnDataOfAdsForPayment: any;
    saveADs() {
        this.apiServices
            .PostMethod('AdOperation', this.previewForm.value)
            .subscribe({
                next: (data: any) => {
                    this.initPaymentDetailsForm();
                    this.returnDataOfAdsForPayment = data;
                    this.paymentDetailsForm.controls['numberOfAds'].setValue(
                        data.numberOfAds
                    );
                    this.paymentDetailsForm.controls[
                        'totalDemandValue'
                    ].setValue(data.totalDemandValue);
                    this.paymentDetailsForm.controls['valueAddedTax'].setValue(
                        data.valueAddedTax
                    );
                    this.touster.success('تم الاضافة بنجاح');
                    this.showPaymentMethodDetailsForm = true;
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    this.touster.error(error);
                    console.log(error);
                },
                complete: () => {},
            });
    }
    updatePaymentMethodForAds() {
        let body = {
            id: this.returnDataOfAdsForPayment.id,
            numberOfAds: this.paymentDetailsForm.controls['numberOfAds'].value,
            valueAddedTax:
                this.paymentDetailsForm.controls['valueAddedTax'].value,
            totalDemandValue:
                this.paymentDetailsForm.controls['totalDemandValue'].value,
            receiptNumber:
                this.paymentDetailsForm.controls['receiptNumber'].value,
            groupNumber: this.paymentDetailsForm.controls['groupNumber'].value,
            paymentMethodId:
                this.paymentDetailsForm.controls['paymentMethodId'].value.id,
            companyId: this.CompanyId.value,
            regionId: this.regionId.value,
        };
        this.apiServices
            .UpdateMethodWithPipe('AdOperation/UpdateAd', body)
            .subscribe({
                next: () => {
                    this.touster.success('تم حفظ البيانات بنجاح');
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    console.log(error);
                },
                complete: () => {},
            });
    }
    canselPayment() {
        this.paymentDetailsForm.reset();
        this.showPaymentMethodDetailsForm = false;
    }

    initPreviewForm(): void {
        this.previewForm = new FormGroup({
            CompanyId: new FormControl(),
            companyIdd: new FormControl(null, Validators.required),
            regionId: new FormControl(null, Validators.required),
            regionIdd: new FormControl(),
            adDetail: new FormArray([]),
        });
    }

    initAdForm(): void {
        this.adForm = new FormGroup({
            location: new FormControl(null, Validators.required),
            numberOfFaces: new FormControl(null, Validators.required),
            previewValue: new FormControl(null, Validators.required),
            siteDescription: new FormControl(null, Validators.required),
            roadId: new FormControl(),
            roadIdd: new FormControl(null, Validators.required),
            adCategoryId: new FormControl(),
            adTypeId: new FormControl(),
            adTypeIdd: new FormControl(null, Validators.required),
        });
    }
    initPaymentDetailsForm(): void {
        this.paymentDetailsForm = new FormGroup({
            id: new FormControl(null),
            numberOfAds: new FormControl(null),
            valueAddedTax: new FormControl(null),
            totalDemandValue: new FormControl(null),
            receiptNumber: new FormControl(null, Validators.required),
            groupNumber: new FormControl(null, Validators.required),
            paymentMethodId: new FormControl(null, Validators.required),
            CompanyId: new FormControl(null),
            regionId: new FormControl(null),
        });
        this.paymentDetailsForm.controls['numberOfAds'].disable();
        this.paymentDetailsForm.controls['valueAddedTax'].disable();
        this.paymentDetailsForm.controls['totalDemandValue'].disable();
    }

    selectedCompany!: any;
    selectedRegion!: number;
    selectedRoad!: number;
    selectedAdType!: number;
    selectedPaymentMethod!: number;
    choosenSelect(event: any, flag?: any): void {
        switch (flag) {
            case 'company':
                this.selectedCompany = <number>event.value;
                this.CompanyId.setValue(event.value.id);
                break;

            case 'region':
                this.selectedRegion = <number>event.value.id;
                this.regionId.setValue(this.selectedRegion);
                break;

            case 'road':
                this.selectedRoad = <number>event.value.id;
                this.roadId.setValue(this.selectedRoad);
                break;

            case 'adType':
                this.selectedAdType = <number>event.value.adCategoryId;
                this.adTypeId.setValue(this.selectedAdType);
                break;
            case 'paymentMethod':
                this.selectedPaymentMethod = <number>event.value.adCategoryId;
                this.adTypeId.setValue(this.selectedPaymentMethod);
                break;
        }
    }

    // call api for company to get all companies
    getallCompanies(): void {
        this.apiServices
            .GetMethod(`Company/GetAllCompanies?pageNumber=${this.pageNumber}`)
            .subscribe({
                next: (data: Company[]) => {
                    this.allCompanies = data;
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    this.touster.error(error);
                    console.log(error);
                },
                complete: () => {},
            });
    }
    // call api for company to get all roads
    getallRoads(): void {
        this.apiServices.GetMethod('Road').subscribe({
            next: (data: Road[]) => {
                this.allRoads = data;
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    // call api for company to get all regions
    getallRegions(): void {
        this.apiServices.GetMethod('Region').subscribe({
            next: (data: Region[]) => {
                this.allRegions = data;
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    // call api for company to get all ad types
    getallAdTypes(): void {
        this.apiServices.GetMethod('AdType/GetAll').subscribe({
            next: (data: AdType[]) => {
                this.allAdTypes = data;
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }
    // call api for company to get all payment methods
    getallPaymentMethods() {
        this.apiServices.GetMethod('PaymentMethod').subscribe({
            next: (data: PaymentMethods[]) => {
                this.allPaymentMethods = data;
            },
            error: (error) => {
                this.touster.error('عملية خاطئة');
                console.log(error);
            },
            complete: () => {},
        });
    }

    // call api for getting category depended on ad type
    categoryData!: AdCategory;
    async getAdCategoryIdByAdTypeId(adTypeId: number) {
        await lastValueFrom(
            this.apiServices.GetMethod(
                `AdType/GetAdCategoryByAdTypeId/${adTypeId}`
            )
        )
            .then((data) => {
                this.categoryData = data;
                this.adForm.controls['adCategoryId'].setValue(data.id);
            })
            .catch((error) => {
                this.touster.error('عملية خاطئة');
                this.touster.error(error);
                console.log(error);
            });
    }
    /**
     * this fn to filter data tables
     * @param event hold the string to filter data which contain this string
     * no return value
     */
    onGlobalFilter(event: any): void {
        event.table.filterGlobal(
            (event.event.target as HTMLInputElement).value,
            'contains'
        );
    }

    get ads() {
        return this.previewForm.controls['adDetail'] as FormArray;
    }
    get adTypeId() {
        return this.adForm.controls['adTypeId'] as FormControl;
    }
    get roadId() {
        return this.adForm.controls['roadId'] as FormControl;
    }
    get regionId() {
        return this.previewForm.controls['regionId'] as FormControl;
    }
    get CompanyId() {
        return this.previewForm.controls['CompanyId'] as FormControl;
    }
}
