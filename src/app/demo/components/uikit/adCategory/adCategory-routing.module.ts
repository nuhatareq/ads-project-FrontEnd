import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdCategoryComponent } from './adCategory.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'adCategory', component: AdCategoryComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class AdCategoryRoutingModule {}
