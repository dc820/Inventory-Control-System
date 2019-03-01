import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AppRoutingModule } from './app-routing.module';
import { InboundComponent } from './inbound/inbound.component';
import { OutboundComponent } from './outbound/outbound.component';
import { ReportsComponent } from './reports/reports.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    InboundComponent,
    OutboundComponent,
    ReportsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
