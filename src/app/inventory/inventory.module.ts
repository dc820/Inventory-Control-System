import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { AllInvComponent } from './all/all-inv.component';
import { AddGroupComponent } from './modal/add-group.component';

@NgModule({
  declarations: [
    AllInvComponent,
    AddGroupComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ]
})
export class InventoryModule { }
