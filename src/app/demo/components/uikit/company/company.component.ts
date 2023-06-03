import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../../layout/service/http-services.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobTitle } from '../../../../models/jobTitle';
import { Company } from '../../../../models/company';
import { environment } from './../../../../../environments/environment';
import { Representer } from './../../../../models/representer';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
    ImageUrl = environment.image_url;
    IsSpinner: boolean = true;
    companies: Company[] = [];
    company: Company = {
        id: 0,
        companyName: '',
        companyPhoneNumber: '',
        companyFaxNumber: '',
        companyEmail: '',
        companyAddress: '',
        commercialCompanyName: '',
        commercialNumber: '',
        commercialDocument: '',
        commercialIssuedPlace: '',
        taxCompanyName: '',
        taxNumber: '',
        taxDocument: '',
        taxIssuedPlace: '',
        companyRepresenters: [],
    };
    companyForm!: FormGroup;
    represnterForm!: FormGroup;
    Representer!: Representer;
    representers: Representer[] = [];
    jobTitles: JobTitle[] = [];
    selectedJob!: number;
    selectedRepresenter!: boolean;
    owners: any = [
        { name: 'مالك', id: true },
        { name: 'مفوض', id: false },
    ];
    cols: any[] = [];
    headers: Array<string> = [
        'اسم الشركة ',
        'رقم السجل الضريبى',
        'عنوان الشركة',
        'رقم هاتف الشركة',
        'مأمورية الضرائب',
        'خيارات',
    ];
    keys: Array<string> = [
        'companyName',
        'taxNumber',
        'companyAddress',
        'companyPhoneNumber',
        'taxIssuedPlace',
    ];
    productDialog: boolean = false;
    deleteProductDialog: boolean = false;
    editproductDialog: boolean = false;
    isAddRepresenter: boolean = false;
    constructor(
        private apiServices: HttpServicesService,
        private touster: ToastrService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: 'companyName', header: 'companyName' },
            {
                field: 'taxNumber',
                header: 'taxNumber',
            },
            { field: 'companyAddress', header: 'companyAddress' },
            { field: 'companyPhoneNumber', header: 'companyPhoneNumber' },
            { field: 'taxIssuedPlace', header: 'taxIssuedPlace' },
            { field: 'options', header: 'options' },
        ];
        this.getallCompanies();
    }

    // start company form
    //init all inputs
    // no return values and no params
    initCompanyForm(): void {
        this.companyForm = new FormGroup({
            id: new FormControl(0),
            companyName: new FormControl(null, [Validators.required]),
            companyPhoneNumber: new FormControl(null, [
                Validators.required,
                Validators.pattern('^(01)(0|1|2|5)([0-9]{8})$'),
            ]),
            companyFaxNumber: new FormControl(null, Validators.required),
            companyEmail: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            companyAddress: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[\u0621-\u064A-/ ]+$'),
            ]),
            commercialCompanyName: new FormControl(null, Validators.required),
            commercialNumber: new FormControl(null, Validators.required),
            commercialDocument: new FormControl('', Validators.required),
            commercialIssuedPlace: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[\u0621-\u064A-/ ]+$'),
            ]),
            taxCompanyName: new FormControl(null, Validators.required),
            taxNumber: new FormControl(null, Validators.required),
            taxDocument: new FormControl('', Validators.required),
            taxIssuedPlace: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[\u0621-\u064A-/ ]+$'),
            ]),
            companyRepresenters: new FormArray<FormGroup>([]),
        });
    }

    // init representer add form to add representer in array or indvidual
    // it return form of representer data
    // no params
    initRepresnterDataForm(): FormGroup {
        this.represnterForm = new FormGroup({
            companyId: new FormControl(0),
            representerFullName: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[\u0621-\u064A-/ ]+$'),
            ]),
            representerOfficeNumber: new FormControl(null, Validators.required),
            representerEmail: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            representerPIOID: new FormControl(null, [
                Validators.required,
                Validators.pattern(
                    '^([2-3]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})([0-9]{1})$'
                ),
            ]),
            representerFaxNumber: new FormControl(null, Validators.required),
            representerNumber: new FormControl(null, [
                Validators.required,
                Validators.pattern('^(01)(0|1|2|5)([0-9]{8})$'),
            ]),
            isOnwerr: new FormControl(null, Validators.required),
            jobTypeIdd: new FormControl(null, Validators.required),
            isOnwer: new FormControl(null),
            jobTypeId: new FormControl(null),
        });
        return this.represnterForm;
    }

    /**
     *   this fn and these vars for pagination
     * @param event is the changing value of numbers to jump on pages
     * no return values
     */
    first: number = 1;
    rows: number = 10;
    pageNumber = 1;
    onPageChange(event: any): void {
        this.first = event.first;
        this.pageNumber = event.page + 1;
        this.rows = event.rows;
        this.getallCompanies();
    }

    // this fn to add new representer on update company info
    // no params no return values
    addNewRepresenterInUpdateCompanyModal(): void {
        this.newRepresenter.controls['companyId'].setValue(this.company.id);
        this.apiServices
            .PostMethod(
                'Company/AddCompanyRepresnter',
                this.newRepresenter.value
            )
            .subscribe({
                next: (res) => {
                    this.getallCompanies();
                    this.representers.push(<Representer>res);
                    this.touster.success('تم التعديل بنجاح');
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    this.touster.error(error);
                    console.log(error);
                },
            });
    }
    /**
     *  this fn to delete new representer on update company info
     * @param representerId
     * no return values
     */
    deleteRepresenterforUpdateCompanyModal(representerId: number): void {
        this.apiServices
            .DeleteMethodWithPipeWithoutId(
                `Company/DeleteCompanyRepresnter?companyRepresnterId=${this.representers[representerId].id}`
            )
            .subscribe({
                next: () => {
                    this.getallCompanies();
                    this.representers.splice(representerId, 1);
                    this.touster.success('تم الحذف بنجاح');
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    this.touster.error(error);
                    console.log(error);
                },
            });
    }

    /**
     *this fn patching value of selected company and show it in its modal
     * @param company
     * no return values
     */
    editProduct(company: Company): void {
        this.getSpecificCompany(company.id);
        this.getallJobs();
        this.initCompanyForm();
        this.addRepresenterForUpdate();
        this.editproductDialog = true;
        this.isAddRepresenter = true;
        this.companyForm.patchValue({
            id: company.id,
            companyName: company.companyName,
            companyPhoneNumber: company.companyPhoneNumber,
            companyFaxNumber: company.companyFaxNumber,
            companyEmail: company.companyEmail,
            companyAddress: company.companyAddress,
            commercialCompanyName: company.commercialCompanyName,
            commercialNumber: company.commercialNumber,
            commercialDocument: company.commercialDocument,
            commercialIssuedPlace: company.commercialIssuedPlace,
            taxCompanyName: company.taxCompanyName,
            taxNumber: company.taxNumber,
            taxDocument: company.taxDocument,
            taxIssuedPlace: company.taxIssuedPlace,
        });
    }
    /**
     * this fn to save updates of company info
     * no return values
     */
    updateSelectedCompany(): void {
        const body = {
            id: this.companyForm.controls['id'].value,
            companyName: this.companyForm.controls['companyName'].value,
            companyPhoneNumber:
                this.companyForm.controls['companyPhoneNumber'].value,
            companyFaxNumber:
                this.companyForm.controls['companyFaxNumber'].value,
            companyEmail: this.companyForm.controls['companyEmail'].value,
            companyAddress: this.companyForm.controls['companyAddress'].value,
            commercialCompanyName:
                this.companyForm.controls['commercialCompanyName'].value,
            commercialNumber:
                this.companyForm.controls['commercialNumber'].value,
            commercialDocument:
                this.companyForm.controls['commercialDocument'].value,
            commercialIssuedPlace:
                this.companyForm.controls['commercialIssuedPlace'].value,
            taxCompanyName: this.companyForm.controls['taxCompanyName'].value,
            taxNumber: this.companyForm.controls['taxNumber'].value,
            taxDocument: this.companyForm.controls['taxDocument'].value,
            taxIssuedPlace: this.companyForm.controls['taxIssuedPlace'].value,
        };
        this.apiServices
            .UpdateMethodWithPipe('Company/UpdateCompany', body)
            .subscribe({
                next: () => {
                    this.getallCompanies();
                    this.touster.success('تم التعديل بنجاح');
                    // this.editproductDialog = false;
                    // this.companyForm.reset();
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    this.touster.error(error);
                    console.log(error);
                },
            });
    }
    // deleteSelectedCompany(): void {
    //     this.apiServices.DeleteMethod(`/${this.company.id}`, '').subscribe({
    //         next: () => {
    //             this.touster.success('تم الحذف بنجاح');
    //             this.getallCompanies();
    //         },
    //         error: (error: any) => {
    //             this.touster.error('عملية خاطئة');
    //             this.touster.error(error);
    //             console.log(error);
    //         },
    //         complete: () => {},
    //     });
    // }

    // deleteProduct(company: Company): void {
    //     // this.deleteProductDialog = true;
    //     // this.company = { ...company };
    // }
    // confirmDelete(): void {
    //     this.deleteProductDialog = false;
    //     this.deleteSelectedCompany();
    //     // this.company={};
    // }
    /**
     * this vars and fn are responsible for getting sepecific company data to show its info
     * @param event for getting company info
     * no return values
     */
    show: boolean = false; // for show dialog
    commericalDocumentLink: string = ''; // for merge url with document name to gey full path
    taxDocumentLink: string = ''; // for merge url with document name to gey full path
    showCompanyDetails(event: Company): void {
        this.show = true;
        this.getSpecificCompany(event.id);
    }

    /**
     * this fn to get selected company to do any operation on it
     * @param companyId is th id of company to call api to get it by its id
     */
    async getSpecificCompany(companyId: number) {
        await lastValueFrom(
            this.apiServices.GetMethod(
                `Company/GetCompanyDetails?companyId=${companyId}`
            )
        )
            .then((data: Company) => {
                this.company = data;
                this.representers = this.company.companyRepresenters;
                this.commericalDocumentLink = `${this.ImageUrl}${this.company.commercialDocument}`;
                this.taxDocumentLink = `${this.ImageUrl}${this.company.taxDocument}`;
            })
            .catch((error: any) => {
                this.touster.error('عملية خاطئة');
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
    // this fn to open add company dialog
    openNew(): void {
        this.initCompanyForm();
        this.getallJobs();
        this.companyForm.reset();
        // this.submitted = false;
        this.productDialog = true;
    }

    // this fn to close add company dialog
    hideDialog(): void {
        this.productDialog = false;
        this.editproductDialog = false;
        this.deleteProductDialog = false;
        this.companyForm.reset();
        this.isAddRepresenter = false;
    }
    // this fn to push a representer in representer form array
    addOwner(): void {
        let newOwner: FormGroup = this.initRepresnterDataForm();
        this.companyRepresenters.push(newOwner);
    }
    // this fn to toggle btn of add representer at update modal for company
    // and it init the form and reset all old values
    newRepresenter!: FormGroup;
    addRepresenterForUpdate() {
        this.isAddRepresenter = !this.isAddRepresenter;
        this.newRepresenter = this.initRepresnterDataForm();
        this.newRepresenter.reset();
    }
    //to get type specific because it needed for html error occured
    getFromControl(index: number, formarray: FormArray<any>): FormGroup<any> {
        return formarray.controls[index] as FormGroup<any>;
    }
    // this for save adding company info
    //  no return values or params
    saveCompany(): void {
        this.companyForm.controls['id'].setValue(0);
        this.apiServices
            .PostMethod('Company/AddCompany', this.companyForm.value)
            .subscribe({
                next: () => {
                    this.getallCompanies();
                    this.touster.success('تم الاضافة بنجاح');
                    // this.submitted = false;
                    this.productDialog = false;
                    // this.companyForm.reset();
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    this.touster.error(error);
                    console.log(error);
                },
                complete: () => {},
            });
    }

    /**
     * this fn to take choosing values from select inputs to get there values
     * @param event is the value of select but its a object of values {name , id}
     * @param IsJob is flag to know is values from job select or owner select
     */
    choosenSelect(event: any, IsJob: boolean): void {
        if (IsJob) {
            this.selectedJob = <number>event.value.id;
            this.jobTypeId.setValue(this.selectedJob);
        } else {
            this.selectedRepresenter = <boolean>event.value.id;
            this.isOnwer.setValue(this.selectedRepresenter);
        }
    }

    // this fn to get file source of image and upload it to the static server
    //@param event when value of photo change
    // no return values
    Imagesource!: any;
    onSelectFile(event: any, isTax: boolean): void {
        if (event.target.files) {
            this.Imagesource = event.target.files[0];
        }
        this.uplaodPhotoToServer(isTax);
    }

    // save/ uplaod image to server
    // no params , no return
    responseImagedata!: any;
    imagePathControlName!: string;
    imagePathControlNametax!: string;
    uplaodPhotoToServer(isTax: boolean): void {
        let formdata = new FormData();
        formdata.append('file', this.Imagesource);
        this.apiServices
            .postImage('api/UploadStaticFile', formdata)
            .subscribe((res) => {
                this.responseImagedata = res;
                if (!isTax) {
                    this.imagePathControlName = this.responseImagedata.file;
                    this.commercialDocument.setValue(this.imagePathControlName);
                } else {
                    this.imagePathControlNametax = this.responseImagedata.file;
                    this.taxDocument.setValue(this.imagePathControlNametax);
                }
            });
    }

    // call api for company to get all companies
    getallCompanies(): void {
        this.apiServices
            .GetMethod(`Company/GetAllCompanies?pageNumber=${this.pageNumber}`)
            .subscribe({
                next: (data: Company[]) => {
                    this.companies = data;
                    this.IsSpinner = false;
                },
                error: (error: any) => {
                    this.touster.error('عملية خاطئة');
                    this.touster.error(error);
                    console.log(error);
                },
                complete: () => {},
            });
    }
    // call api for jobs to get all job titles
    getallJobs(): void {
        this.apiServices.GetMethod('JobTitle').subscribe({
            next: (data: JobTitle[]) => {
                this.jobTitles = data;
            },
            error: (error: any) => {
                this.touster.error('عملية خاطئة');
                this.touster.error(error);
                console.log(error);
            },
            complete: () => {},
        });
    }

    // all this gets to get some info easly from form groups
    get jobTypeId() {
        return this.represnterForm.controls['jobTypeId'] as FormControl;
    }
    get isOnwer() {
        return this.represnterForm.controls['isOnwer'] as FormControl;
    }
    get commercialDocument(): FormControl {
        return this.companyForm.controls['commercialDocument'] as FormControl;
    }
    get taxDocument(): FormControl {
        return this.companyForm.controls['taxDocument'] as FormControl;
    }
    get companyRepresenters(): FormArray {
        return this.companyForm.controls['companyRepresenters'] as FormArray;
    }
}
