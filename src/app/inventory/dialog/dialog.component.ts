import { Component, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { InventoryControlService } from '../inventory-control.service';
import { Device } from 'src/app/shared/models/device.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  options: FormGroup;
  slideToggle = false;
  // Get Mode Selected From Table Action Buttons
  mode = this.inventoryControlService.mode;
  // Form Field Values
  type = [
    'Router',
    'Switch',
    'Firewall',
    'Access Point',
    'Load Balancer',
    'Other'
  ];
  inventoryTraffic = [
    'In Stock',
    'Inbound',
    'Outbound'
  ];
  condition = [
    'Used',
    'New',
    'Defective'
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    fb: FormBuilder,
    private inventoryControlService: InventoryControlService,
    private snackBar: MatSnackBar
  ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  onSubmit(form: NgForm) {
    // Set Blank RMA Value If No Value Defined
    if (form.value.rma === undefined) {
      form.value.rma = '';
    }
    console.log(form.value);
    if (form.value.condition === '' && form.value.rma === '' && form.value.traffic === '' && form.value.note === '') {
      this.snackBar.open('At Least One Field is Required to Continue', 'Close');
      return;
    }

    // Add Device If Mode Is Add
    if (this.mode === 'Add') {
      this.inventoryControlService.dialogDeviceGroupCheck.forEach(group => {
        // If Added Model Is Already In Device Group, Brand & Type Are Made The Same
        if (form.value.model === group.model) {
          form.value.brand = group.brand;
          form.value.type = group.type;
        }
      });
      this.inventoryControlService.addDevice(form.value);
      this.slideToggle = false;
      this.dialogRef.close();
    } else {
      // Update Device If Mode Is Update
      this.inventoryControlService.updateDevice(form.value);
      this.slideToggle = false;
      this.dialogRef.close();
    }
  }
  // Toggle Slider For RMA Field
  toggle() {
    this.slideToggle = !this.slideToggle;
  }
  // Resets Toggle When Dialog Closes
  resetToggle() {
    this.slideToggle = false;
  }
}
