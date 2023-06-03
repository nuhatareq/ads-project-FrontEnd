import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdTypeComponent } from './adType.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: 'adType', component: AdTypeComponent }]),
    ],
    exports: [RouterModule],
})
export class AdTypeRoutingModule {}
