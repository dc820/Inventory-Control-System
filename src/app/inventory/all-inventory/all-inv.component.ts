import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
// import { SelectionModel } from '@angular/cdk/collections';
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
  mainColumns: string[] = ['model', 'brand', 'type'];
  nestedColumns: string[] = ['traffic', 'condition', 'serial', 'rma', 'note'];
  // Data Arrays
  DEVICE_GROUPS: object[] = [];
  ALL_DEVICES: object[] = [];
  expandedDeviceGroup: Device | null;
  // Table Data Source
  dataSource = new MatTableDataSource<object>(this.DEVICE_GROUPS);
  nestedDataSource = new MatTableDataSource<object>(this.ALL_DEVICES);
  // Unique Device Models
  uniqueModels: string[];

  // selection = new SelectionModel<Device>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryControlService: InventoryControlService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getInventory();
  }

  ngOnDestroy() {
    // Unsubscribe Before Destroying Component To Avoid Memory Leaks
    this.devicesSub.unsubscribe();
    this.deviceGroupsSub.unsubscribe();
    this.uniqueModelsSub.unsubscribe();
  }

  getInventory() {
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
      // Set Devices Into Their Specific Group
      let i = 0;
      this.DEVICE_GROUPS.forEach((group: Device) => {
        const groupArray = [];
        devices.forEach((device: Device) => {
          if (device.model === group.model) {
            groupArray.push(device);
            this.ALL_DEVICES[i] =  groupArray;
          }
        });
        i++;
      });
      // Set Nested Devices Data Source
      this.nestedDataSource.data = this.ALL_DEVICES;
    });
    // Pagination & Sorting For Main Table
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Sorting For Nested Table
    // this.nestedDataSource.sort = this.sort;
    // Subscription To Unique Device Models
    this.uniqueModelsSub = this.inventoryControlService.getUniqueModelsListener()
    .subscribe((models) => {
      this.uniqueModels = models;
    });
  }


  nestedData(deviceGroup: Device) {
    const transformedColumns = [];
    for (let i = 0; i < this.nestedColumns.length; i++) {
      transformedColumns[i] = this.nestedColumns[i] + deviceGroup.model;
    }
    return transformedColumns;
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
  }
  // Opens Modal & Pass Mode Depending On Table Button Click
  openDialog(mode): void {
    this.inventoryControlService.mode = mode;
    console.log('Open Dialog ' + mode + ' Mode');
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
      console.log('The Dialog Was Closed');
      this.getInventory();
      // this.selection.clear();
    });
  }

  /*
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
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: Device): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.model + 1}`;
  }
  */
}
