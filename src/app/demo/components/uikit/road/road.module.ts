import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { RoadRoutingModule } from './road-routing.module';
import { RoadComponent } from './road.component';

@NgModule({
    declarations: [RoadComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        InputTextModule,
        TooltipModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        FileUploadModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        SharedModule,
        RoadRoutingModule,
    ],
})
export class RoadModule {}