import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    PageNotFoundComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
