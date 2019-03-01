import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  headings;
  tRow;
  footing;

  constructor() { }

  ngOnInit() {
    // Retrieve Inventory Table From MongoDB Database
    // Heading for each cell can be modified here
    this.headings = ['Device', 'Model', 'Label', 'Starting', 'Recieved', 'Shipped', 'On-hand', 'Minimum' ];

    // Dummy data. Can push row obects to array to populate inventory table
    this.tRow = [
      { id: '1',
        checkbox: 'u1',
        device: 'Router',
        model: '4300',
        label: 'Cisco Router- 4300',
        start: '45',
        recieved: '143',
        shipped: '76',
        onhand: '86',
        minimum: '88' },

      { id: '2',
        checkbox: 'u2',
        device: 'Router',
        model: '4300',
        label: 'Cisco Router- 4300',
        start: '45',
        recieved: '143',
        shipped: '76',
        onhand: '86',
        minimum: '88' }
      ];

    // Footer icons on table
    this.footing = [ { id: 'Add', icon: 'fas fa-plus' },
                { id: 'Edit', icon: 'fas fa-pencil-alt' },
                { id: 'Remove', icon: 'fas fa-trash' },
                { id: 'Resync', icon: 'fas fa-sync-alt' } ];
  }

  selectOption(id) {
    // Just Run Service Here & Pass ID. Switch Statement Would Be Used Inside Service
    switch (id) { // In Manipulate Inventory Service - ID Passed
      case 'Add':
        console.log(id); // Add Modal
        break;
      case 'Edit':
        console.log(id); // Edit Modal
        break;
      case 'Remove':
        console.log(id); // Remove Modal
        break;
      case 'Resync':
        console.log(id); // Resync MongoDB All Inventory Database
        break;
      default:
        console.log('Error: No Selection');
    }
  }
}
