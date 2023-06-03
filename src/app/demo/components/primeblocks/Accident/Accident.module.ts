import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccidentComponent } from './Accident.component';
import { AccidentRoutingModule } from './Accident-routing.module';
@NgModule({
    imports: [CommonModule, AccidentRoutingModule],
    declarations: [AccidentComponent],
})
export class AccidentModule {}
