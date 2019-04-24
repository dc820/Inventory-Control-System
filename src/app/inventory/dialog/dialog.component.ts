import { Component, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InventoryControlService } from '../inventory-control.service';
import { Device } from 'src/app/shared/device.model';

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
    { value: 'Stock', icon: 'storage', message: 'Stock' },
    { value: 'Inbound', icon: 'home', message: 'Inbound'},
    { value: 'Outbound', icon: 'local_shipping', message: 'Outbound'},
    { value: 'Recycled', icon: 'delete_outline', message: 'Recycled' }
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
    private inventoryControlService: InventoryControlService
  ) {
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'auto',
      });
    }

  onSubmit(form: NgForm) {
    console.log(form.value);
    // Set Blank RMA Value If No Value Defined
    if (form.value.rma === undefined) {
      form.value.rma = '';
    }
    // Add Device If Mode Is Add
    if (this.mode === 'Add') {
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