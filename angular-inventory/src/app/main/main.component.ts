import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // Heading for each cell can be modified here
  headings = ['Device', 'Model', 'Label', 'Starting', 'Recieved', 'Shipped', 'On-hand', 'Minimum' ];

  // Dummy data. Can push row obects to array to populate inventory table
  tRow = [
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
  footings = [ { href: '#', id: 'Add', icon: 'fas fa-plus' },
             { href: '#', id: 'Edit', icon: 'fas fa-pencil-alt' },
             { href: '#', id: 'Remove', icon: 'fas fa-trash' },
             { href: '#', id: 'Resync', icon: 'fas fa-sync-alt' } ];

  constructor() { }

  ngOnInit() {
  }

}
