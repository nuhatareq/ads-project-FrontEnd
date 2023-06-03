import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'الصفحة الرئيسية',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'البيانات الاساسية',
                items: [
                    {
                        label: 'تصنيف الاعلان ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/adCategory/adCategory'],
                    },
                    {
                        label: 'نوع الاعلان ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/adType/adType'],
                    },
                    {
                        label: 'المسمى الوظيفى  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/jobTitle/jobTitle'],
                    },
                    {
                        label: 'المنطقة  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/region/region'],
                    },
                    {
                        label: 'نوع المنطقة  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/regionType/regionType'],
                    },
                    {
                        label: 'الطريق  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/road/road'],
                    },
                    {
                        label: 'الشركات  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/company/company'],
                    },
                    {
                        label: 'المعاينات  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/previews/previews'],
                    },
                    {
                        label: 'الاعلانات  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/ADs/ADs'],
                    },
                    {
                        label: 'التراخيص  ',
                        icon: 'pi pi-fw pi-circle-fill',
                        routerLink: ['/uikit/licenses/licenses'],
                    },
                ],
            },
            {
                label: 'الاسعار',
                items: [
                    {
                        label: 'طرق الدفع',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/uikit/paymentMethod/payment'],
                    },
                    // {
                    //     label: 'جداول الاستقطاعات',
                    //     icon: 'pi pi-fw pi-desktop',
                    //     url: ['https://www.primefaces.org/primeflex/'],
                    //     target: '_blank',
                    // },
                ],
            },
            {
                label: 'اعدادات النظام',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'توقيت و نسب رد التذاكر',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud'],
                    },
                    {
                        label: 'انواع الرد',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline'],
                    },
                ],
            },
        ];
    }
}
