import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'accident',
                loadChildren: () =>
                    import('./Accident/Accident.module').then(
                        (m) => m.AccidentModule
                    ),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PrimeBlocksRoutingModule {}
