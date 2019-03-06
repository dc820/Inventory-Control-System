import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryControlService } from 'src/app/inventory-control.service';

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

      // Pushing Dummy Data At the Moment.
      // Need To Send Request To Update DB With Device, Model, Etc. Need To Recieve DB Generated IDs
      this.inventoryControlService.device.push({

        rowId: '2', // Retrive Unique ID From Database
        checkboxId: 'u2', // Retrive Unique ID From Database
        device: form.value.device,
        model: form.value.model,
        label: form.value.manufacturer + ' ' + form.value.device + '- ' + form.value.model,
        start: '45', // User Defined Starting Inventory For Group  <----------NEED TO ADD THIS OPTION IN HTML MODAL
        recieved: '143', // Counter For When Devices Are Set To Incoming
        shipped: '76', // Counter For When Devices Are Set To Outgoing
        onhand: '86', // Counter For Current Stock When Devices Are Set To Onhand
        minimum: '88' } // User Defined Minimum For Group <----------NEED TO ADD THIS OPTION IN HTML MODAL

      );
      console.log(this.inventoryControlService.device);
    }
  }
}

// form.value.addDevice
