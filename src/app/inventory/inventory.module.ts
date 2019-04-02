import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AllInvComponent } from './all-inventory/all-inv.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { DialogComponent } from './dialog/dialog.component';




@NgModule({
  declarations: [
    AllInvComponent,
    DialogComponent
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
