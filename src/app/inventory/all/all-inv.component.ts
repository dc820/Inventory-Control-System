import { Component, ViewEncapsulation, OnInit, OnDestroy  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryControlService } from '../inventory-control.service';
import { Device } from 'src/app/shared/device.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-inv',
  templateUrl: './all-inv.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./all-inv.component.css']
})
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
}
