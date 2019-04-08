import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   // HTTP
import { Device } from '../shared/device.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const API_ENDPOINT = 'http://localhost:3000/api/inventory/';

@Injectable({
  providedIn: 'root'
})

export class InventoryControlService {
  private devices: Device[] = [];
  private devicesUpdated = new Subject<Device[]>();
  private deviceGroups: object[] = [];
  private deviceGroupsUpdated = new Subject<object[]>();

  mode: string;
  selected: Device[];

  constructor(private http: HttpClient) { }

  getDeviceUpdateListener() {
    return this.devicesUpdated.asObservable();
  }

  getDeviceGroupUpdateListener() {
    return this.deviceGroupsUpdated.asObservable();
  }

  getInventory() {
    this.http.get<{ message: string, allInventory: any, uniqueModels: Array<string>, deviceGroups: Array<object> }>(API_ENDPOINT)
      .subscribe((deviceData) => {
        console.log(deviceData);
        this.devices = deviceData.allInventory;
        this.devicesUpdated.next([...this.devices]);
        this.deviceGroups = deviceData.deviceGroups;
        this.deviceGroupsUpdated.next([...this.deviceGroups]);
      });
  }

  addDevice(newDevice) {
    const device: Device = {
      id: null,
      traffic: newDevice.traffic,
      condition: newDevice.condition,
      type: newDevice.type,
      model: newDevice.model,
      brand: newDevice.brand,
      serial: newDevice.serial,
      rma: newDevice.rma,
      note: newDevice.note
    };
    console.log(device);
    this.http.post<{ message: string, deviceId: string}>(API_ENDPOINT, device)
        .subscribe((responseData) => {
          const deviceId = responseData.deviceId;
          device.id = deviceId;
          this.devices.push(device);
          this.devicesUpdated.next([...this.devices]);
        });
  }

  updateDevice(editDevice) {
    console.log(editDevice.id);
    const device: Device = {
      id: editDevice.id,
      traffic: editDevice.traffic,
      condition: editDevice.condition,
      type: editDevice.type,
      model: editDevice.model,
      brand: editDevice.brand,
      serial: editDevice.serial,
      rma: editDevice.rma,
      note: editDevice.note
    };
    this.http.patch<{message: string, device: object}>(API_ENDPOINT + device.id, device)
      .subscribe((responseData) => {
        console.log(responseData);
        for (let i = 0; i < this.devices.length ; i++) {
          if (this.devices[i].id === editDevice.id ) {
            this.devices[i] = device;
          }
        }
        this.devicesUpdated.next([...this.devices]);
      });
  }

  deleteSelection(id) {
    console.log(id);
    this.http.delete<{message: string}>(API_ENDPOINT + id)
      .subscribe((responseData) => {
        console.log(responseData);
        for (let i = 0; i < this.devices.length ; i++) {
          if (this.devices[i].id === id ) {
            this.devices.splice(i, 1);
          }
        }
        this.devicesUpdated.next([...this.devices]);
      });
  }
}
