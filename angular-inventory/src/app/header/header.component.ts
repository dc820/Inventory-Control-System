import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() setActiveTab = new EventEmitter<{id: string, name: string, active: boolean}>();
  tabs = [
    {id: 'AllTab', name: 'All Inventory', active: true},
    {id: 'InboundTab', name: 'Inbound Inventory', active: false},
    {id: 'OutboundTab', name: 'Outbound Inventory', active: false},
    {id: 'ReportsTab', name: 'Reports', active: false}
  ];

  constructor() { }

  ngOnInit() {
  }

  onNavTab(event: any) {
    this.tabs.forEach((tab) => {
      if (event.target.id === tab.id) {
        tab.active = true;
        this.setActiveTab.emit({id: tab.id, name: tab.name, active: true});
      } else {
        tab.active = false;
      }
    });
  }
}
