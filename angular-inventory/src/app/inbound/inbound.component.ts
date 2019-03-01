import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.css']
})
export class InboundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toOutbound() {
    this.router.navigate(['outbound']);
  }
}
