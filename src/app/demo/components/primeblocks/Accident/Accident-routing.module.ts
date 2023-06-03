import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccidentComponent } from './Accident.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: AccidentComponent }]),
    ],
    exports: [RouterModule],
})
export class AccidentRoutingModule {}
