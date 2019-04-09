import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { InventoryControlService } from '../inventory-control.service';
import { Device } from '../../shared/device.model';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-all-inv',
  templateUrl: './all-inv.component.html',
  styleUrls: ['./all-inv.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})


export class AllInvComponent implements OnInit, OnDestroy {
  private devicesSub: Subscription;
  private deviceGroupsSub: Subscription;

  // Heading for each cell can be modified here
  // selection = new SelectionModel<Device>(true, []);
  mainColumns: string[] = ['model', 'brand', 'type'];
  nestedColumns: string[] = ['traffic', 'condition', 'serial', 'rma', 'note'];
  DEVICE_GROUPS: object[] = [];
  ALL_DEVICES: object[] = [];
  expandedDeviceGroup: Device | null;
  dataSource = new MatTableDataSource<object>(this.DEVICE_GROUPS);
  nestedDataSource = new MatTableDataSource<object>(this.ALL_DEVICES);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryControlService: InventoryControlService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getInventory();
  }

  ngOnDestroy() {
    this.devicesSub.unsubscribe();
    this.deviceGroupsSub.unsubscribe();
  }

  getInventory() {
    // console.log(this.selection.selected[1]); Can get selected Rows by ID in Array of All Selected
    this.inventoryControlService.getInventory();
    this.deviceGroupsSub = this.inventoryControlService.getDeviceGroupUpdateListener()
      .subscribe((deviceGroup) => {
        this.DEVICE_GROUPS = deviceGroup;
        this.dataSource.data = this.DEVICE_GROUPS;
      });
    this.inventoryControlService.getInventory();
    this.devicesSub = this.inventoryControlService.getDeviceUpdateListener()
    .subscribe((devices: []) => {
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
      this.nestedDataSource.data = this.ALL_DEVICES;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.nestedDataSource.data);
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
    const dialogRef = this.dialog.open(DialogComponent);
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
