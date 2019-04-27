import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tabs = [
    {id: 'AllTab', name: 'All Inventory', path: 'all'},
    {id: 'InStockTab', name: 'In Stock', path: 'instock'},
    {id: 'InboundTab', name: 'Inbound', path: 'inbound'},
    {id: 'OutboundTab', name: 'Outbound', path: 'outbound'}
  ];
}
