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

  // Need to Create Query Functions Like Below To Retrieve Tables Based On Specified Query (Inbound, Outbound, All)
  getInventory() {
    this.http.get<{ message: string, devices: any }>('http://localhost:3000/api/inventory')
      .pipe(map((deviceData) => {
        return deviceData.devices.map(device => {
          return {
            id: device._id,
            status: device.status,
            type: device.type,
            model: device.model,
            manufacturer: device.manufacturer,
            serial: device.serial,
            rma: device.rma,
            note: device.note
          };
        });
      }))
      .subscribe((transformedData) => {
        console.log(transformedData);
        this.devices = transformedData;
        this.devicesUpdated.next([...this.devices]);
      });
  }

  addDevice(status, type, model, manufacturer, serial, rma, note) {
    const device: Device = { id: null, status, type, model, manufacturer, serial, rma, note};
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
