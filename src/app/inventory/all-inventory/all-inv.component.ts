import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { InventoryControlService } from '../inventory-control.service';
import { Device } from '../../shared/device.model';

import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-all-inv',
  templateUrl: './all-inv.component.html',
  styleUrls: ['./all-inv.component.css'],
  // Animation For Expandable Rows
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})

export class AllInvComponent implements OnInit, OnDestroy {
  // Subscriptions For HTTP Response
  private devicesSub: Subscription;
  private deviceGroupsSub: Subscription;
  private uniqueModelsSub: Subscription;

  // Header Cells For Table Can Be Modified Here
  mainColumns: string[] = ['select', 'model', 'brand', 'type'];
  trafficColumns: string[] = ['Stock', 'Inbound', 'Outbound', 'Recycled'];
  ALL_DEVICES: object[] = [];
  GROUPED_DEVICES: object[] = [];
  // Devices Grouped By Model
  DEVICE_GROUPS: object[] = [];
  // Unique Device Models
  uniqueModels: string[];
  // Table Data Source
  dataSource = new MatTableDataSource<object>(this.DEVICE_GROUPS);

  expandedDeviceGroup: Device | null;
  checkedDevices: Device[];
  // Selection Model
  selection = new SelectionModel<Device>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryControlService: InventoryControlService, public dialog: MatDialog) {}

  ngOnInit() {
    this.checkedDevices = [];
    this.getInventory();
  }

  ngOnDestroy() {
    // Unsubscribe Before Destroying Component To Avoid Memory Leaks
    this.devicesSub.unsubscribe();
    this.deviceGroupsSub.unsubscribe();
    this.uniqueModelsSub.unsubscribe();
  }

  getInventory() {
    // Reset Checked Devices
    this.checkedDevices = [];
    // Returns All Inventory, Devices Grouped, & Unique Models
    this.inventoryControlService.getInventory();
    // Subscribe To Device Groups
    this.deviceGroupsSub = this.inventoryControlService.getDeviceGroupUpdateListener()
      .subscribe((deviceGroup) => {
        // Set Device Groups
        this.DEVICE_GROUPS = deviceGroup;
        // Set Device Group Data Source
        this.dataSource.data = this.DEVICE_GROUPS;
      });
    // Returns All Inventory, Devices Grouped, & Unique Models
    this.inventoryControlService.getInventory();
    // Subscribe To All Devices
    this.devicesSub = this.inventoryControlService.getDeviceUpdateListener()
    .subscribe((devices: []) => {
      this.ALL_DEVICES = devices;
      // Set Devices Into Their Specific Group
      let i = 0;
      this.DEVICE_GROUPS.forEach((group: Device) => {
        const groupArray = [];
        devices.forEach((device: any) => {
          if (device.model === group.model) {
            // Device Recieves Property Check On Inventory Update
            device.checked = false;
            groupArray.push(device);
            this.GROUPED_DEVICES[i] = groupArray;
          }
        });
        i++;
      });
    });
    // Pagination & Sorting For Main Table
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.GROUPED_DEVICES);
    console.log(this.GROUPED_DEVICES[0]);
    // Subscription To Unique Device Models
    this.uniqueModelsSub = this.inventoryControlService.getUniqueModelsListener()
    .subscribe((models) => {
      this.uniqueModels = models;
    });
  }

  deleteSelection() {
    /*
    if (this.selection.selected.length > 0) {
      this.selection.selected.forEach((device) => {
        this.inventoryControlService.deleteSelection(device.id);
      });
      console.log(this.selection.selected);
      this.selection.clear();
      this.getInventory();
    }
    */
  }

  //  Filtering For Table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.selection.selected);
  }
  // Opens Modal & Pass Mode Depending On Table Button Click
  openDialog(mode): void {
    this.inventoryControlService.mode = mode;
    /*if (this.selection.selected.length === 0 && mode === 'Update' || this.selection.selected.length > 1) {
      alert('No Selection Or More Than 1');
      return;
    }
    if (mode === 'Update') {
      console.log(this.selection.selected);
      this.inventoryControlService.selected = this.selection.selected;
    }*/
    // Creates Dialog Reference To Open Component
    const dialogRef = this.dialog.open(DialogComponent);
    // Subscribes To Closing Of Dialog
    dialogRef.afterClosed().subscribe(result => {
      this.getInventory();
      // this.selection.clear();
    });
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach((row: Device) => this.selection.select(row));
    this.onRowChecked(null);
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: Device): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.model + 1}`;
  }
  // When True Device Check, Add To Checked Devices Array
  onCheck(device: any) {
    if (!device.checked) {
      this.checkedDevices.push(device);
    } else {
      this.checkedDevices.splice(this.checkedDevices.indexOf(device), 1);
    }
    console.log(this.checkedDevices);
  }

  // GROUPED_DEVICES, checkedDevices, & compare by model
  onRowChecked(deviceGroup: any) {
    // ALL DEVICES ARE SELECTED
    if (this.selection.selected.length === this.GROUPED_DEVICES.length) {
      const newCheckedArr = [];
      this.ALL_DEVICES.forEach((device: any) => {
        device.checked = true;
        newCheckedArr.push(device);
        this.checkedDevices = newCheckedArr;
        console.log(this.checkedDevices);
      });
    } else if (this.selection.selected.length === 0) {
      this.ALL_DEVICES.forEach((device: any) => {
        device.checked = false;
      });
      this.checkedDevices = [];
    } else {
      this.selection.selected.forEach(selectedDevice => {
        this.ALL_DEVICES.forEach((device: any) => {
          if (device.model === selectedDevice.model) {
            device.checked = true;
          }
        });
      });
      this.ALL_DEVICES.forEach((device: any) => {
        if (device.checked === true) {
          console.log('Device Are Checked');
          // Look Through Checked Devices
          // If Device Isn't In Checked Devices Add It
          // Else Ignore

          if (!this.checkedDevices.includes(device, 0)) {
            this.checkedDevices.push(device);
          }
        }
      });
      // console.log(this.selection.selected);
      console.log(this.checkedDevices);
    }
  }
}
