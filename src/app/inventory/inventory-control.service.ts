import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   // HTTP
import { Device } from '../shared/device.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InventoryControlService {
  private devices: Device[] = [];
  private devicesUpdated = new Subject<Device[]>();

  constructor(private http: HttpClient) { }

  getDeviceUpdateListener() {
    return this.devicesUpdated.asObservable();
  }

  getInventory() {
    this.http.get<{ message: string, allInventory: any }>('http://localhost:3000/api/inventory')
      .pipe(map((deviceData) => {
        return deviceData.allInventory.map(device => {
          return {
            id: device._id,
            status: device.status,
            type: device.type,
            model: device.model,
            brand: device.brand,
            serial: device.serial,
            rma: device.rma,
            note: device.note
          };
        });
      }))
      .subscribe((transformedData) => {
        // console.log(transformedData);
        this.devices = transformedData;
        this.devicesUpdated.next([...this.devices]);
      });
  }

  addDevice(status, type, model, brand, serial, rma, note) {
    const device: Device = { id: null, status, type, model, brand, serial, rma, note};
    this.http
    .post<{ message: string, deviceId: string}>('http://localhost:3000/api/inventory', device)
        .subscribe((responseData) => {
          const deviceId = responseData.deviceId;
          device.id = deviceId;
          this.devices.push(device);
          this.devicesUpdated.next([...this.devices]);
        });
  }
}
