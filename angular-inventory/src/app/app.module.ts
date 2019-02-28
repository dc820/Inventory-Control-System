import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddModalComponent } from './inventory/add-modal/add-modal.component';

const appRoutes: Routes = [
  { path: '', component: InventoryComponent },
  { path: 'inbound', component: HeaderComponent },
  { path: 'outbound', component: HeaderComponent },
  { path: 'reports', component: HeaderComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    AddModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
