import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobTitleComponent } from './jobTitle.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'jobTitle', component: JobTitleComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class JobTitleRoutingModule {}
