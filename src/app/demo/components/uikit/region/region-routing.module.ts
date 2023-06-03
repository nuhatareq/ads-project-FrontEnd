import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegionComponent } from './region.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: 'region', component: RegionComponent }]),
    ],
    exports: [RouterModule],
})
export class RegionRoutingModule {}
