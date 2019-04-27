import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Device } from 'src/app/shared/device.model';
import { Subscription } from 'rxjs';
import { InventoryControlService } from '../inventory-control.service';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.css']
})

export class TrafficComponent implements OnInit, OnDestroy {
  private inboundSub: Subscription;
  private outboundSub: Subscription;
  private inStockSub: Subscription;
  inventory: Device[] = [];
  traffic: string;
  displayedColumns: string[] = ['type', 'brand', 'model', 'condition', 'serial', 'rma', 'note' ];
  dataSource = new MatTableDataSource<Device>(this.inventory);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activeRoute: ActivatedRoute, private inventoryControlService: InventoryControlService) { }

  ngOnInit() {
    this.activeRoute.url.subscribe(url => {
      console.log(url[0].path);
      switch (url[0].path) {
        case 'inbound':
          this.traffic = 'Inbound';
          this.inventoryControlService.getInventory(this.traffic);
          break;
        case 'outbound':
          this.traffic = 'Outbound';
          this.inventoryControlService.getInventory(this.traffic);
          break;
        default:
          this.traffic = 'InStock';
          this.inventoryControlService.getInventory(this.traffic);
      }
    });
    this.inboundSub = this.inventoryControlService.getInventoryUpdateListener(this.traffic).subscribe((inbound) => {
      this.inventory = inbound;
      this.dataSource = new MatTableDataSource(this.inventory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.outboundSub = this.inventoryControlService.getInventoryUpdateListener(this.traffic).subscribe((outbound) => {
      this.inventory = outbound;
      this.dataSource = new MatTableDataSource(this.inventory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.inStockSub = this.inventoryControlService.getInventoryUpdateListener(this.traffic).subscribe((inStock) => {
      this.inventory = inStock;
      this.dataSource = new MatTableDataSource(this.inventory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.inboundSub.unsubscribe();
    this.outboundSub.unsubscribe();
    this.inStockSub.unsubscribe();
  }

  getInventory(traffic) {
    this.inventoryControlService.getInventory(traffic);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
