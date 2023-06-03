import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADsComponent } from './ADs.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: 'ADs', component: ADsComponent }]),
    ],
    exports: [RouterModule],
})
export class ADsRoutingModule {}
