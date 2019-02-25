import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-inventory';
  activeTabId = 'AllTab';
  activeTabObj: {id: string, name: string, active: boolean};

  onActive(data) {
    this.activeTabObj = data;
    if (this.activeTabObj.id === 'AllTab') {
      this.activeTabId = this.activeTabObj.id;
    }

    if (this.activeTabObj.id === 'InboundTab') {
      this.activeTabId = this.activeTabObj.id;
    }

    if (this.activeTabObj.id === 'OutboundTab') {
      this.activeTabId = this.activeTabObj.id;
    }

    if (this.activeTabObj.id === 'ReportsTab') {
      this.activeTabId = this.activeTabObj.id;
    }
  }
}
