import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'paymentMethod',
                data: { breadcrumb: 'PaymentMethod' },
                loadChildren: () =>
                    import('./paymentMethod/paymentMethod.module').then(
                        (m) => m.PaymentMethodModule
                    ),
            },
            {
                path: 'adCategory',
                data: { breadcrumb: 'AdCategory' },
                loadChildren: () =>
                    import('./adCategory/adcategory.module').then(
                        (m) => m.AdCategoryModule
                    ),
            },
            {
                path: 'adType',
                data: { breadcrumb: 'AdType' },
                loadChildren: () =>
                    import('./adType/adType.module').then(
                        (m) => m.AdTypeModule
                    ),
            },
            {
                path: 'jobTitle',
                data: { breadcrumb: 'jobTitle' },
                loadChildren: () =>
                    import('./jobTitle/jobTitle.module').then(
                        (m) => m.JobTitleModule
                    ),
            },
            {
                path: 'region',
                data: { breadcrumb: 'region' },
                loadChildren: () =>
                    import('./region/region.module').then(
                        (m) => m.RegionModule
                    ),
            },
            {
                path: 'regionType',
                data: { breadcrumb: 'regionType' },
                loadChildren: () =>
                    import('./regionType/regionType.module').then(
                        (m) => m.RegionTypeModule
                    ),
            },
            {
                path: 'road',
                data: { breadcrumb: 'road' },
                loadChildren: () =>
                    import('./road/road.module').then((m) => m.RoadModule),
            },
            {
                path: 'company',
                data: { breadcrumb: 'company' },
                loadChildren: () =>
                    import('./company/company.module').then(
                        (m) => m.CompanyModule
                    ),
            },
            {
                path: 'previews',
                data: { breadcrumb: 'previews' },
                loadChildren: () =>
                    import('./previews/previews.module').then(
                        (m) => m.PreviewsModule
                    ),
            },
            {
                path: 'licenses',
                data: { breadcrumb: 'licenses' },
                loadChildren: () =>
                    import('./licenses/licenses.module').then(
                        (m) => m.LicensesModule
                    ),
            },
            {
                path: 'ADs',
                data: { breadcrumb: 'ADs' },
                loadChildren: () =>
                    import('./ADs/ads.module').then((m) => m.ADsModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class UIkitRoutingModule {}
