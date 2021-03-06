import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Device } from '../shared/models/device.model';
import { AuthService } from '../auth/auth.service';

const API_ENDPOINT = 'http://localhost:3000/api/inventory/';

@Injectable({
  providedIn: 'root'
})

export class InventoryControlService {
  // Data For Other Components
  private devices: Device[] = [];
  private deviceGroups: object[] = [];
  private uniqueModels: string[] = [];
  private inStockInventory: Device[] = [];
  private inboundInventory: Device[] = [];
  private outboundInventory: Device[] = [];
  private auditLog: object[] = [];

  private devicesUpdated = new Subject<Device[]>();
  private deviceGroupsUpdated = new Subject<object[]>();
  private uniqueModelsUpdated = new Subject<string[]>();
  private inStockInventoryUpdated = new Subject<Device[]>();
  private inboundInventoryUpdated = new Subject<Device[]>();
  private outboundInventoryUpdated = new Subject<Device[]>();
  private auditLogUpdated = new Subject<object[]>();

  // Mode Selected From Table
  mode: string;
  childSelection: object[];
  dialogDeviceGroupCheck = [];

  constructor(private http: HttpClient, private authService: AuthService) { }
  /**
   * Update Listeners
   */
  getInventoryUpdateListener(traffic: string) {
    switch (traffic) {
      case 'InStock':
        return this.inStockInventoryUpdated.asObservable();
      case 'Inbound':
         return this.inboundInventoryUpdated.asObservable();
      case 'Outbound':
        return this.outboundInventoryUpdated.asObservable();
      default:
        return this.devicesUpdated.asObservable();
    }
  }
  getDeviceGroupUpdateListener() {
    return this.deviceGroupsUpdated.asObservable();
  }
  getUniqueModelsListener() {
    return this.uniqueModelsUpdated.asObservable();
  }
  getAuditUpdateListener() {
    return this.auditLogUpdated.asObservable();
  }

  /**
   * Retrives All Inventory & Sorts Devices
   */
  getInventory(traffic: string) {
    switch (traffic) {
      case 'InStock':
        this.http.get<{ message: string, inStockInventory: any }>(API_ENDPOINT + traffic)
        .subscribe((deviceData) => {
          this.inStockInventory = deviceData.inStockInventory;
          this.inStockInventoryUpdated.next([...this.inStockInventory]);
        });
        break;
      case 'Inbound':
        this.http.get<{ message: string, inboundInventory: any }>(API_ENDPOINT + traffic)
        .subscribe((deviceData) => {
          this.inboundInventory = deviceData.inboundInventory;
          this.inboundInventoryUpdated.next([...this.inboundInventory]);
        });
        break;
      case 'Outbound':
        this.http.get<{ message: string, outboundInventory: any }>(API_ENDPOINT + traffic)
        .subscribe((deviceData) => {
          this.outboundInventory = deviceData.outboundInventory;
          this.outboundInventoryUpdated.next([...this.outboundInventory]);
        });
        break;
      default:
        this.http.get<{ message: string, allInventory: any, uniqueModels: any, deviceGroups: Array<object> }>(API_ENDPOINT)
        .subscribe((deviceData) => {
          this.devices = deviceData.allInventory;
          this.deviceGroups = deviceData.deviceGroups;
          this.uniqueModels = deviceData.uniqueModels;
          // Pass Copy of Devices Array to Updated Devices
          this.devicesUpdated.next([...this.devices]);
          // Pass Copy of Device Groups Array to Updated Device Groups
          this.deviceGroupsUpdated.next([...this.deviceGroups]);
          // Pass Copy of Unique Models Array to Updated Unique Models
          this.uniqueModelsUpdated.next([...this.uniqueModels]);
        });
    }
  }
  /**
   * Add Device To Inventory
   */
  addDevice(newDevice) {
    console.log(this.authService.getUserEmail());
    const device: Device = {
      _id: null,
      traffic: newDevice.traffic,
      condition: newDevice.condition,
      type: newDevice.type,
      model: newDevice.model,
      brand: newDevice.brand,
      serial: newDevice.serial,
      rma: newDevice.rma,
      note: newDevice.note,
      user: this.authService.getUserEmail()
    };
    this.http.post<{ message: string, deviceId: string }>(API_ENDPOINT, device)
        .subscribe((responseData) => {
          const deviceId = responseData.deviceId;
          device._id = deviceId;
          this.devices.push(device);
          this.getInventory('All');
        });
  }
  /**
   * Find Device By ID & Update Specified Device Properties
   */
  updateDevice(editValues) {
    console.log(editValues);
    const idList: string[] = [];
    this.childSelection.forEach((child: Device) => {
      if (child.condition === '') {
        child.condition = editValues.condition;
      }
      if (child.traffic === '') {
        child.traffic = editValues.traffic;
      }
      if (child.rma === '') {
        child.rma = editValues.rma;
      }
      if (child.note === '') {
        child.note = editValues.note;
      }
      editValues.user = this.authService.getUserEmail();

      idList.push(child._id);
    });
    this.http.patch<{ message: string, device: object }>(API_ENDPOINT + idList, editValues)
      .subscribe((responseData) => {
        for (let i = 0; i < this.devices.length ; i++) {
          if (this.devices[i]._id === editValues.id ) {
            this.devices[i] = editValues;
          }
        }
        this.getInventory('All');
      });
  }
  /**
   * Delete Device By ID
   */
  deleteSelection(deleteCheckedArr) {
    deleteCheckedArr.push(this.authService.getUserEmail());
    this.http.delete<{ message: string }>(API_ENDPOINT + deleteCheckedArr)
      .subscribe((responseData) => {
        console.log(responseData);
        deleteCheckedArr.forEach(deletedID => {
          for (let i = 0; i < this.devices.length ; i++) {
            if (this.devices[i]._id === deletedID ) {
              this.devices.splice(i, 1);
            }
          }
        });
        this.getInventory('All');
      });
  }

  getAuditLog() {
    this.http.get<{ audit: object[]}>(API_ENDPOINT + 'audit')
      .subscribe(responseData => {
        this.auditLog = responseData.audit;
        this.auditLog.forEach((device: any) => {
          const formatDate = new Date(device.time);
          device.time = formatDate.getMonth() + '/' + formatDate.getDate() + '/' + formatDate.getFullYear() + '\n'
            + formatDate.getHours() + ':' + formatDate.getMinutes() + ':' + formatDate.getSeconds();
        });
        this.auditLogUpdated.next([...this.auditLog]);
      });
  }
}
