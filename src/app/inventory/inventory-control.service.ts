import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Device } from '../shared/device.model';

const API_ENDPOINT = 'http://localhost:3000/api/inventory/';

@Injectable({
  providedIn: 'root'
})

export class InventoryControlService {
  // Data For Other Components
  private devices: Device[] = [];
  private deviceGroups: object[] = [];
  private uniqueModels: string[] = [];
  private devicesUpdated = new Subject<Device[]>();
  private deviceGroupsUpdated = new Subject<object[]>();
  private uniqueModelsUpdated = new Subject<string[]>();
  // Mode Selected From Table
  mode: string;
  childrenSelection: object[];
  dialogDeviceGroupCheck = [];

  constructor(private http: HttpClient) { }
  /**
   * Update Listeners
   */
  getDeviceUpdateListener() {
    return this.devicesUpdated.asObservable();
  }
  getDeviceGroupUpdateListener() {
    return this.deviceGroupsUpdated.asObservable();
  }
  getUniqueModelsListener() {
    return this.uniqueModelsUpdated.asObservable();
  }
  /**
   * Retrives Inventory From Backend
   */
  getInventory() {
    this.http.get<{ message: string, allInventory: any, uniqueModels: any, deviceGroups: Array<object> }>(API_ENDPOINT)
      .subscribe((deviceData) => {
        console.log(deviceData.deviceGroups);
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
  /**
   * Add Device To Backend Inventory
   */
  addDevice(newDevice) {
    const device: Device = {
      _id: null,
      traffic: newDevice.traffic,
      condition: newDevice.condition,
      type: newDevice.type,
      model: newDevice.model,
      brand: newDevice.brand,
      serial: newDevice.serial,
      rma: newDevice.rma,
      note: newDevice.note
    };
    this.http.post<{ message: string, deviceId: string}>(API_ENDPOINT, device)
        .subscribe((responseData) => {
          const deviceId = responseData.deviceId;
          device._id = deviceId;
          this.devices.push(device);
          this.getInventory();
        });
  }
  /**
   * Find Device By ID & Update Specified Device Properties On Backend
   */
  updateDevice(editValues) {
    console.log(editValues);
    const idList: string[] = [];
    this.childrenSelection.forEach((child: Device) => {
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
      idList.push(child._id);
    });
    console.log(this.childrenSelection);
    this.http.patch<{message: string, device: object}>(API_ENDPOINT + idList, editValues)
      .subscribe((responseData) => {
        for (let i = 0; i < this.devices.length ; i++) {
          if (this.devices[i]._id === editValues.id ) {
            this.devices[i] = editValues;
          }
        }
        this.getInventory();
      });
  }
  /**
   * Delete Device By ID
   */
  deleteSelection(deleteCheckedArr) {
    this.http.delete<{message: string}>(API_ENDPOINT + deleteCheckedArr)
      .subscribe((responseData) => {
        console.log(responseData);
        deleteCheckedArr.forEach(deletedID => {
          for (let i = 0; i < this.devices.length ; i++) {
            if (this.devices[i]._id === deletedID ) {
              this.devices.splice(i, 1);
            }
          }
        });
        this.getInventory();
      });
  }
}
