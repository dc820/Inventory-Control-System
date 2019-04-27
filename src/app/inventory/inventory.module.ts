import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { AllInvComponent } from './all-inventory/all-inv.component';
import { DialogComponent } from './dialog/dialog.component';
import { TrafficComponent } from './traffic/traffic.component';

@NgModule({
  declarations: [
    AllInvComponent,
    DialogComponent,
    TrafficComponent,
  ],
  imports: [
    AngularMaterialModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AllInvComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class InventoryModule { }
