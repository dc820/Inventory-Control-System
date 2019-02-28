import { Component, OnInit, DoCheck } from '@angular/core';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'angular-inventory';

  constructor(private navigationService: NavigationService) {}
  activeTab: {id: string, name: string, active: boolean};

  ngOnInit() {
    this.activeTab = this.navigationService.activeTab;
  }

  ngDoCheck() {
    this.activeTab = this.navigationService.activeTab;
    console.log('Active Tab: ' + this.activeTab.name);
  }

}
