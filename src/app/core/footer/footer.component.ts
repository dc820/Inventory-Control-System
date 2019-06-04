import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {}
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  tabs = [
    {id: 'InStockTab', name: 'In Stock', path: 'instock'},
    {id: 'InboundTab', name: 'Inbound', path: 'inbound'},
    {id: 'OutboundTab', name: 'Outbound', path: 'outbound'},
    {id: 'ModifyTab', name: 'Modify', path: 'modify'},
  ];

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
