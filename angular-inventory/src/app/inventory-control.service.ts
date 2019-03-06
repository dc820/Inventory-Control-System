import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryControlService {

  // This Should Display Group Information From Query 
  deviceGroup: [{}];

  // Dummy Data. This Should Display Individual Device Information From Query
  device = [
    { rowId: '1',
      checkboxId: 'u1', // Retrive Unique ID From Database
      device: 'Router',
      model: '4300',
      label: 'Cisco Router- 4300',
      start: '45',
      recieved: '143',
      shipped: '76',
      onhand: '86',
      minimum: '88' }
    ];

  constructor() { }

  // Need to Create Query Functions Like Below To Retrieve Tables Based On Specified Query (Inbound, Outbound, All)
  // getInventory()
}
