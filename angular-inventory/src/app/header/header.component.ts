import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tabs = this.navigationService.tabs;
  constructor(private navigationService: NavigationService) { }

  onNavTab(event: any) {
    this.navigationService.onNavTab(event);
  }
}
