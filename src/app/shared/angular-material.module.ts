import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatListModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatListModule,
    MatSnackBarModule
  ]
})

export class AngularMaterialModule { }
