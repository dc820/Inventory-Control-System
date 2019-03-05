import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tabs = [
    {id: 'AllTab', name: 'All Inventory', path: ''},
    {id: 'InboundTab', name: 'Inbound Inventory', path: 'inbound'},
    {id: 'OutboundTab', name: 'Outbound Inventory', path: 'outbound'},
    {id: 'ReportsTab', name: 'Reports', path: 'reports'}
  ];
  constructor() { }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
