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
  // Header Cells For Table
  mainColumns: string[] = ['select', 'model', 'brand', 'type', 'total'];
  trafficColumns: string[] = ['Stock', 'Inbound', 'Outbound'];
  // All Devices Ungrouped
  ALL_DEVICES: Device[] = [];
  // Devices Grouped In Respective Model Category
  GROUPED_DEVICES: object[] = [];
  // Device Category Rows By Model, Brand, & Type
  DEVICE_GROUPS: Device[] = [];
  // Unique Device Models
  uniqueModels: string[];
  // Table Data Source
  dataSource = new MatTableDataSource<Device>(this.DEVICE_GROUPS);
  // For Table Row Expansion
  expandedDeviceGroup: Device | null;
  // VIEW SELECTION MODEL DOCUMENTATION - Angular CDK - selection.d.ts
  selection = new SelectionModel<object>(true, []);
  childrenSelection = new SelectionModel<object>(true, []);
  indeterminateSelection = new SelectionModel<object>(true, []);
  // Pagination & Sort For Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryControlService: InventoryControlService, public dialog: MatDialog) {}
  /**
   * Initialize Inventory Table & Subscribe To Observables
   */
  ngOnInit() {
    // Retrieve All Inventory, Devices Grouped, & Unique Models
    this.getInventory();
    // Subscription To Unique Device Models
    this.uniqueModelsSub = this.inventoryControlService.getUniqueModelsListener()
    .subscribe((models) => {
      this.uniqueModels = models;
    });
    // Subscribe To Device Groups
    this.deviceGroupsSub = this.inventoryControlService.getDeviceGroupUpdateListener()
      .subscribe((deviceGroup: Device[]) => {
        // Set Device Groups
        this.DEVICE_GROUPS = deviceGroup;
        // Set Device Group Data Source
        this.dataSource.data = this.DEVICE_GROUPS;
        // Pagination & Sorting For Table
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setDeviceGroups();
      });
    // Subscribe To All Devices
    this.devicesSub = this.inventoryControlService.getDeviceUpdateListener()
    .subscribe((devices: []) => {
      this.ALL_DEVICES = devices;
    });
  }
  /**
   * Unsubscribe Before Destroying Component To Avoid Memory Leaks
   */
  ngOnDestroy() {
    this.devicesSub.unsubscribe();
    this.deviceGroupsSub.unsubscribe();
    this.uniqueModelsSub.unsubscribe();
  }
  /**
   * Retrieve Inventory & Clear Selections
   */
  getInventory() {
    this.clearSelection();
    this.inventoryControlService.getInventory();
  }
  /**
   * Retrieve Inventory From HTTP Request & Subscribe To Listeners
   */
  clearSelection() {
    this.selection.clear();
    this.childrenSelection.clear();
    this.indeterminateSelection.clear();
  }
  /**
   * Set Devices Into Their Specific Group
   */
  setDeviceGroups() {
    let i = 0;
    this.dataSource.data.forEach((group: Device) => {
      const groupArray = [];
      this.ALL_DEVICES.forEach((device: any) => {
        if (device.model === group.model) {
          groupArray.push(device);
          this.GROUPED_DEVICES[i] = groupArray;
        }
      });
      i++;
    });
  }
  /**
   * Get Device Group Totals For Rows
   */
  getDeviceGroupLength(deviceGroup: any) {
    let groupTotal = 0;
    this.ALL_DEVICES.forEach((device: any) => {
      if (device.model === deviceGroup.model) {
        groupTotal++;
      }
    });
    return groupTotal;
  }
  /**
   * Opens Modal & Pass Mode Depending On Table Button Clicked - Add/Edit Mode
   */
  openDialog(mode): void {
    this.inventoryControlService.mode = mode;
    if (this.childrenSelection.selected.length === 0 && mode === 'Update'
      || this.childrenSelection.selected.length > 1  && mode === 'Update') {
      alert('There is no selection or more than 1 selection.');
      return;
    }
    if (mode === 'Update') {
      console.log(mode);
      // Need To Decide What To Do With Editing
    }
    // Creates Dialog Reference To Open Component
    const dialogRef = this.dialog.open(DialogComponent);
    // Subscribes To Closing Of Dialog
    dialogRef.afterClosed().subscribe(result => {
      this.clearSelection();
    });
  }
  /**
   * Delete Selected Devices & Clear Selection
   */
  deleteSelection() {
    if (this.childrenSelection.selected.length > 0) {
      const deleteCheckedArr = [];
      this.childrenSelection.selected.forEach((device: Device) => {
        deleteCheckedArr.push(device._id);
      });
      console.log(deleteCheckedArr);
      this.inventoryControlService.deleteSelection(deleteCheckedArr);
      this.clearSelection();
    }
  }
  /**
   * Apply Filter To Table. Filter By Model, Brand, & Type
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**
   * Whether The Number Of Selected Elements Matches The Total Number Of Rows
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /**
   * Selects All Rows If They Are Not All Selected; Otherwise Clear Selection
   */
  masterToggle() {
    this.isAllSelected() ?
    this.childrenSelection.clear() :
    this.ALL_DEVICES.forEach(device => this.childrenSelection.select(device));

    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach((row: Device) => this.selection.select(row));
  }
  /**
   * Children Checkbox Selection
   */
  onCheck(device: any, deviceGroup: any) {
    if (this.childrenSelection.isSelected(device)) {
      this.GROUPED_DEVICES.forEach((group: []) => {
        const filteredGroup = group.filter((groupDevice: Device) => groupDevice.model === deviceGroup.model);
        const filteredSelection = this.childrenSelection.selected.filter(
          (childSelection: Device) => childSelection.model === deviceGroup.model
        );
        if (filteredGroup.length === filteredSelection.length) {
          this.indeterminateSelection.deselect(deviceGroup);
          this.selection.select(deviceGroup);
        }
        if (filteredSelection.length < filteredGroup.length && filteredSelection.length > 0) {
          this.indeterminateSelection.select(deviceGroup);
        }
      });
    } else {
      this.selection.deselect(deviceGroup);
      this.indeterminateSelection.select(deviceGroup);
      const filteredSelection = this.childrenSelection.selected.filter(
        (childSelection: Device) => childSelection.model === deviceGroup.model
      );
      if (filteredSelection.length === 0) {
        this.indeterminateSelection.deselect(deviceGroup);
      }
    }
  }
  /**
   * Parent Checkbox To Toggle All Children
   */
  selectChildren(deviceGroup: any) {
    console.log(this.selection.selected);
    if (this.selection.isSelected(deviceGroup)) {
      console.log('Group Selected');
      this.GROUPED_DEVICES.forEach((group: []) => {
        const filteredGroup = group.filter((device: Device) => device.model === deviceGroup.model);
        filteredGroup.forEach(device => {
          this.indeterminateSelection.deselect(deviceGroup);
          this.childrenSelection.select(device);
        });
      });
    } else {
      console.log('Group Deselected');
      this.GROUPED_DEVICES.forEach((group: []) => {
        const filteredGroup = group.filter((device: Device) => device.model === deviceGroup.model);
        filteredGroup.forEach(device => {
          this.childrenSelection.deselect(device);
        });
      });
    }
  }
  /**
   * The Label For The Checkbox On The Passed Row
   */
  checkboxLabel(row?: Device): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.model}`;
  }
}
