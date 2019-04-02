import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { InventoryModule } from './inventory/inventory.module';
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularMaterialModule,
    SharedModule,
    CoreModule,
    InventoryModule,
    AppRoutingModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
