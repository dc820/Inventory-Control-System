import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryControlService } from 'src/app/inventory/inventory-control.service';
import { Device } from '../../shared/device.model';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  defaultStatus: string;
  defaultPart: string;
  defaultDevice: string;
  defaultManufacturer: string;
  deviceGroup: Array<object>;
  newDevice: Device;

  status = [
    {value: 'Onhand', id: 'statusStorage' },
    {value: 'Inbound', id: 'statusInbound' },
    {value: 'Outbound', id: 'statusOutbound' }
  ];

  part = [
    {value: 'Storage', id: 'partStorage' },
    {value: 'Recycle', id: 'partRecycle' },
    {value: 'Defective', id: 'partRMA' }
  ];

  device = [
    { value: 'Router' },
    {value: 'Switch' },
    {value: 'Firewall' },
    {value: 'Access Point' },
    {value: 'Load Balancer' },
    {value: 'Other' }
  ];

  closeResult: string;

  constructor(private modalService: NgbModal, private inventoryControlService: InventoryControlService) { }

  ngOnInit() {
    // Default Options For Add Modal
    this.defaultStatus = this.status[0].value;
    this.defaultPart = this.part[0].value;
    this.defaultDevice = this.device[0].value;
    this.defaultManufacturer = 'Cisco';
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  //
  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      console.log('Form Valid');
      console.log(this.newDevice);


      this.inventoryControlService.deviceGroup.push(this.newDevice);
      console.log(this.inventoryControlService.deviceGroup);
    }
  }
}

// form.value.addDevice
