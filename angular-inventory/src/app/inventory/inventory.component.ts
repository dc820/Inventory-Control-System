import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  headings: [string, string, string, string, string, string, string, string];
  footing: [ { id: string, icon: string }, { id: string, icon: string }, { id: string, icon: string }, { id: string, icon: string } ];
  defaultStatus: string;
  defaultPart: string;
  defaultDevice: string;
  defaultManufacturer: string;

  // Dummy Data
  tRow = [
    { id: '1',
      checkbox: 'u1',
      device: 'Router',
      model: '4300',
      label: 'Cisco Router- 4300',
      start: '45',
      recieved: '143',
      shipped: '76',
      onhand: '86',
      minimum: '88' },

    { id: '2',
      checkbox: 'u2',
      device: 'Router',
      model: '4300',
      label: 'Cisco Router- 4300',
      start: '45',
      recieved: '143',
      shipped: '76',
      onhand: '86',
      minimum: '88' }
    ];

  status = [
    {value: 'onhand', id: 'statusStorage', label: 'Onhand'},
    {value: 'inbound', id: 'statusInbound', label: 'Inbound'},
    {value: 'outbound', id: 'statusOutbound', label: 'Outbound'}
  ];

  part = [
    {value: 'storage', id: 'partStorage', label: 'Storage'},
    {value: 'recycle', id: 'partRecycle', label: 'Recycle'},
    {value: 'rma', id: 'partRMA', label: 'RMA'}
  ];

  device = [
    { value: 'router', label: 'Router' },
    {value: 'switch', label: 'Switch'},
    {value: 'firewall', label: 'Firewall'},
    {value: 'accessPoint', label: 'Access Point'},
    {value: 'loadBalancer', label: 'Load Balancer'},
    {value: 'Other', label: 'Other'}
  ];

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // Retrieve Inventory Table From MongoDB Database
    // Heading for each cell can be modified here
    this.headings = ['Device', 'Model', 'Label', 'Starting', 'Recieved', 'Shipped', 'On-hand', 'Minimum' ];

    // Footer icons on table
    this.footing = [ { id: 'Add', icon: 'fas fa-plus' },
                { id: 'Edit', icon: 'fas fa-pencil-alt' },
                { id: 'Remove', icon: 'fas fa-trash' },
                { id: 'Resync', icon: 'fas fa-sync-alt' } ];

    // Default Options For Add Modal
    this.defaultStatus = this.status[0].value;
    this.defaultPart = this.part[0].value;
    this.defaultDevice = this.device[0].value;
    this.defaultManufacturer = 'Cisco';
  }

  selectOption(id, content) {
    // Just Run Service Here & Pass ID. Switch Statement Would Be Used Inside Service
    switch (id) { // In Manipulate Inventory Service - ID Passed
      case 'Add':
        console.log(id); // Add Modal
        this.modalService.open(content, { centered: true, size: 'lg' });
        break;
      case 'Edit':
        console.log(id); // Edit Modal
        break;
      case 'Remove':
        console.log(id); // Remove Modal
        break;
      case 'Resync':
        console.log(id); // Resync MongoDB All Inventory Database
        break;
      default:
        console.log('Error: No Selection');
    }
  }
  onSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid === true) {
      console.log('Form Not Valid');
    } else {
    console.log('Form Valid');
    this.tRow.push(form.value);
    console.log(this.tRow);
    }
  }
}
