import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   // HTTP
import { Device } from '../shared/device.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InventoryControlService {
  private devices: Device[] = [];
  private devicesUpdated = new Subject<Device[]>();

  deviceGroup = [];

  constructor(private http: HttpClient) { }

  // Need to Create Query Functions Like Below To Retrieve Tables Based On Specified Query (Inbound, Outbound, All)
  getInventory() {
    this.http.get<{ message: string, devices: Device[] }>('http://localhost:3000/api/inventory')
      .subscribe((deviceData) => {
        console.log(deviceData);
        this.devices = deviceData.devices;
        this.devicesUpdated.next([...this.devices]);
      });
  }
}
