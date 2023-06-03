import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoadComponent } from './road.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: 'road', component: RoadComponent }]),
    ],
    exports: [RouterModule],
})
export class RoadRoutingModule {}
