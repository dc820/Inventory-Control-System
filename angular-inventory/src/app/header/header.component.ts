import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tabs = [
    {id: 'AllTab', name: 'All Inventory', active: true, path: ''},
    {id: 'InboundTab', name: 'Inbound Inventory', active: false, path: 'inbound'},
    {id: 'OutboundTab', name: 'Outbound Inventory', active: false, path: 'outbound'},
    {id: 'ReportsTab', name: 'Reports', active: false, path: 'reports'}
  ];
  constructor() { }

  onNavTab(event: any) {
    this.tabs.forEach((tab) => {
      if (event.target.id === tab.id) {
        tab.active = true;
        console.log('Active Tab: ' + tab.name);
      } else {
        tab.active = false;
      }
    });
  }
}
