import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentMethodComponent } from './paymentMethod.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'payment', component: PaymentMethodComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class PaymentMethodRoutingModule {}
