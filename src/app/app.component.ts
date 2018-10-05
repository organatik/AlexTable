import { Component, OnInit } from '@angular/core';
import * as compareVersions from 'compare-versions';


const ELEMENT_DATA_EVENT = [
  {station: '#1c-Event', stationName: 'name1', version: '3.10.0.00', pending: false, updated: false },
];
const ELEMENT_DATA_LIVE = [
  {station: 'A1', stationName: 'nameA1', version: '3.10.0.01', pending: false, updated: false },
  {station: 'A2', stationName: 'nameA2', version: '3.10.0.02', pending: false, updated: false },
  {station: 'A3', stationName: 'nameA3', version: '3.10.0.02', pending: false, updated: false },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['station', 'station-name', 'version', 'update'];
  dataSourceEvent = ELEMENT_DATA_EVENT;
  dataSourceLive = ELEMENT_DATA_LIVE;
  globalVersion = '3.10.0.03';
  pendingStatus: boolean;
  updatedStatus = false;
  needUpdateAll = true;
  canUpdateLive = true;

  ngOnInit() {
    this.checkVersionAllLive();
    this.checkVersionOfEvents();
  }
  checkVersion( elemVersion ) {
    return compareVersions(this.globalVersion, elemVersion);
  }

  checkVersionAllLive() {
    for (let i = 0; i < this.dataSourceLive.length; i++) {
      if (compareVersions(this.globalVersion, this.dataSourceLive[i].version) === 1) {
        console.log(compareVersions(this.globalVersion, this.dataSourceLive[i].version));
        this.needUpdateAll = false;
        break;
      }
    }
  }
  checkVersionOfEvents() {
    for (let i = 0; i < this.dataSourceEvent.length; i++) {
      if (compareVersions(this.globalVersion, this.dataSourceEvent[i].version) === 1) {
        console.log(compareVersions(this.globalVersion, this.dataSourceEvent[i].version));
        this.needUpdateAll = true;
        break;
      }
    }
  }

  updateVersion(element) {
    element.pending = true;
    setTimeout(() => {
      element.version = this.globalVersion;
      element.pending = false;
      element.updated = true;
      this.needUpdateAll = false;
      console.log(element.version);
    }, 1000);
  }
  updateVersionAll() {
    for (let i = 0; i < this.dataSourceLive.length; i++) {
      if (compareVersions(this.globalVersion, this.dataSourceLive[i].version) !== 0) {
        this.dataSourceLive[i].pending = true;
        setTimeout(() => {
          this.dataSourceLive[i].pending = false;
          this.dataSourceLive[i].updated = true;
          this.dataSourceLive[i].version = this.globalVersion;

        }, Math.floor((Math.random() * 10) + 1) * 1000);
        console.log(this.dataSourceLive[i].pending);
        this.needUpdateAll = true;
      }
    }
  }

}
