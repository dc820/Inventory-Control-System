import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory/inventory.component';
import { InboundComponent } from './inbound/inbound.component';
import { OutboundComponent } from './outbound/outbound.component';
import { ReportsComponent } from './reports/reports.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: InventoryComponent, children: [
        { path: 'Add', component: InboundComponent },
        { path: 'Edit', component: OutboundComponent },
        { path: 'Remove', component: ReportsComponent },
    ] },
    { path: 'inbound', component: InboundComponent },
    { path: 'outbound', component: OutboundComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo: 'not-found' }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
