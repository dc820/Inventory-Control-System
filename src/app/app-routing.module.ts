import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AllInvComponent } from './inventory/all-inventory/all-inv.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TrafficComponent } from './inventory/traffic/traffic.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { AuditComponent } from './inventory/audit/audit.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'instock', component: TrafficComponent, canActivate: [AuthGuard] },
    { path: 'inbound', component: TrafficComponent, canActivate: [AuthGuard] },
    { path: 'outbound', component: TrafficComponent, canActivate: [AuthGuard] },
    { path: 'modify', component: AllInvComponent, canActivate: [AuthGuard] },
    { path:  'audit', component: AuditComponent, canActivate: [AuthGuard] },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: 'not-found' }
  ];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
