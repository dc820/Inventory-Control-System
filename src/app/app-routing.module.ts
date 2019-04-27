import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AllInvComponent } from './inventory/all-inventory/all-inv.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TrafficComponent } from './inventory/traffic/traffic.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'all', component: AllInvComponent },
    { path: 'instock', component: TrafficComponent },
    { path: 'inbound', component: TrafficComponent },
    { path: 'outbound', component: TrafficComponent },
    { path: 'not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo: 'not-found' }
  ];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
