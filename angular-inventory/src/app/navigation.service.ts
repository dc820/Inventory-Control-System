import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  activeTab = { id: 'AllTab', name: 'All Inventory', active: true };

  tabs = [
    {id: 'AllTab', name: 'All Inventory', active: true},
    {id: 'InboundTab', name: 'Inbound Inventory', active: false},
    {id: 'OutboundTab', name: 'Outbound Inventory', active: false},
    {id: 'ReportsTab', name: 'Reports', active: false}
  ];

  constructor() { }

  onNavTab(event: any) {
    this.tabs.forEach((tab) => {
      if (event.target.id === tab.id) {
        tab.active = true;
        this.activeTab = tab;
      } else {
        tab.active = false;
      }
    });
  }
}
