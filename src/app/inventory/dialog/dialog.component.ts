import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Device } from 'src/app/shared/device.model';
import { NgForm } from '@angular/forms';
import { InventoryControlService } from '../inventory-control.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  options: FormGroup;
  slideToggle = false;
  mode = this.inventoryControlService.mode;
  selected = this.inventoryControlService.selected;

  type = [
    'Router',
    'Switch',
    'Firewall',
    'Access Point',
    'Load Balancer',
    'Other'
  ];

  inventoryTraffic = [
    { value: 'Storage', icon: 'storage', message: 'Storage' },
    { value: 'Recycled', icon: 'delete_outline', message: 'Recycling' },
    { value: 'Inbound', icon: 'home', message: 'Inbound'},
    { value: 'Outbound', icon: 'local_shipping', message: 'Outbound'}
  ];

  condition = [
    'Used',
    'New',
    'Defective'
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device, fb: FormBuilder, private inventoryControlService: InventoryControlService) {
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'auto',
      });
    }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.value.rma === undefined) {
      form.value.rma = '';
    }

    if (this.mode === 'Add') {
      this.inventoryControlService.addDevice(form.value);
      this.slideToggle = false;
      this.dialogRef.close();
    } else {
      form.value.id = this.selected[0].id;
      this.inventoryControlService.updateDevice(form.value);
      this.slideToggle = false;
      this.dialogRef.close();
    }
  }
  toggle() {
    this.slideToggle = !this.slideToggle;
  }

  resetToggle() {
    this.slideToggle = false;
  }
}
