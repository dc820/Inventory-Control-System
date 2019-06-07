import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {}
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  tabs = [
    {name: 'In Stock', path: 'instock'},
    {name: 'Inbound', path: 'inbound'},
    {name: 'Outbound', path: 'outbound'},
    {name: 'Modify', path: 'modify'},
    {name: 'Audit Log', path: 'audit'}
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
