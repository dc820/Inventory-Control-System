import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AllInvComponent } from './all-inventory/all-inv.component';
import { AngularMaterialModule } from '../shared/angular-material.module';



@NgModule({
  declarations: [
    AllInvComponent
  ],
  imports: [
    AngularMaterialModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AllInvComponent
  ]
})
export class InventoryModule { }
