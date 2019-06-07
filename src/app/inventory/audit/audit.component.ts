import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';
import { InventoryControlService } from '../inventory-control.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit, OnDestroy {
  private auditSub: Subscription;
  audit: object[] = [];
  displayedColumns: string[] = ['time', 'user', 'change', 'type', 'brand', 'model', 'traffic' , 'condition', 'serial', 'rma', 'note' ];
  dataSource = new MatTableDataSource<object>(this.audit);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryControlService: InventoryControlService) { }

  ngOnInit() {
    this.getAuditLog();
    this.auditSub = this.inventoryControlService.getAuditUpdateListener().subscribe(auditLog => {
      this.audit = auditLog;
      this.dataSource = new MatTableDataSource(this.audit);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.auditSub.unsubscribe();
  }

  getAuditLog() {
    this.inventoryControlService.getAuditLog();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
