import { Injectable } from '@angular/core';
import { Device } from '../shared/device.model';
import { HttpClient } from '@angular/common/http';   // HTTP

@Injectable({
  providedIn: 'root'
})

export class InventoryControlService {
  newDevice = new Device(
      'Switch',
      'WS-2010',
      'Cisco',
      'Serial HERE',
      45,
      143,
      76,
      86,
      88
  );

  deviceGroup = [
    this.newDevice
];

  constructor() { }

  // Need to Create Query Functions Like Below To Retrieve Tables Based On Specified Query (Inbound, Outbound, All)
  getInventory() {
    console.log('getInventory() Fired!');
  }
}
