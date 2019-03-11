import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllInvComponent } from './inventory/all/all-inv.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddGroupComponent } from './inventory/modal/add-group.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    { path: '', component: AllInvComponent, children:
        [{path: 'Add', component: AddGroupComponent}]
    },
    { path: 'home', component: HomeComponent},
    { path: 'not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo: 'not-found' }
  ];

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
