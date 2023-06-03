import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegionTypeComponent } from './regionType.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'regionType', component: RegionTypeComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class RegionTypeRoutingModule {}
