import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Device} from '../../shared/device.model';

/*import { Component, ViewEncapsulation, OnInit, OnDestroy  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryControlService } from '../inventory-control.service';
import { Device } from 'src/app/shared/device.model';
import { Subscription } from 'rxjs';*/

const INVENTORY_DATA: Device[] = [
  { id: '12', status: '', type: 'Router', model:  'ISR4301', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Firewall', model:  'ASA5506', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Router', model:  'ISR4303', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Switch', model:  'ISR4304', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Switch', model:  'ISR4305', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Router', model:  'ISR4306', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Switch', model:  'ISR4307', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Router', model:  'ISR4308', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Firewall', model:  'ASA5506', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Switch', model:  'ISR4310', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Router', model:  'ISR4311', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Switch', model:  'ISR4312', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Router', model:  'ISR4313', brand: 'Cisco', serial: '', rma: '', note: ''},
  { id: '12', status: '', type: 'Firewall', model:  'ASA5506', brand: 'Cisco', serial: '', rma: '', note: ''}
];

@Component({
  selector: 'app-all-inv',
  templateUrl: './all-inv.component.html',
  styleUrls: ['./all-inv.component.css']
})

export class AllInvComponent implements OnInit {
  // Heading for each cell can be modified here
  displayedColumns: string[] = ['model', 'brand', 'type' , 'recieved', 'shipped', 'onhand', 'total', 'minimum' ];
  dataSource = new MatTableDataSource<Device>(INVENTORY_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

/*
export class AllInvComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  private devicesSub: Subscription;

  constructor(private modalService: NgbModal, private inventoryControlService: InventoryControlService) {}
    // Heading for each cell can be modified here
    headings = ['Device', 'Model', 'Manufacturer', 'Starting', 'Recieved', 'Shipped', 'On-hand', 'Minimum' ];

    // Footer icons on table
    footing = [ { id: 'Add', icon: 'fas fa-plus' },
                { id: 'Edit', icon: 'fas fa-pencil-alt' },
                { id: 'Remove', icon: 'fas fa-trash' },
                { id: 'Resync', icon: 'fas fa-sync-alt' } ];

  ngOnInit() {
    this.inventoryControlService.getInventory();
    this.devicesSub = this.inventoryControlService.getDeviceUpdateListener()
      .subscribe((devices: Device[]) => {
        this.devices = devices;
      });
  }

  ngOnDestroy() {
    this.devicesSub.unsubscribe();
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
        this.inventoryControlService.getInventory();
        console.log(id); // Resync MongoDB All Inventory Database
        break;
      default:
        console.log('Error: No Selection');
    }
  }
}*/
