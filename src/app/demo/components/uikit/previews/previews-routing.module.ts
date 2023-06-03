import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreviewsComponent } from './previews.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'previews', component: PreviewsComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class PreviewsRoutingModule {}
