import { Component } from '@angular/core';

import {Plugins} from '@capacitor/core';
const {Own2MeshOkLokPlugin} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Example Lock
  private lockOKGSS101 = {
    name: 'OKGSS101', // Physical lock name
    address: '',
    secret: ['0x4c', '0x5f', '0xc', '0x3c', '0x4c', '0x28', '0x53', '0x24', '0x20', '0x36', '0x14', '0x5b', '0x53', '0x59', '0x20', '0x4'], // lock key as hexadecimal integer literal string array (Begins with the 0 digit followed by either an x or X, followed by any combination of the digits 0 through 9 and the letters a through f or A through F.)
    pw: ['0x33', '0x32', '0x31', '0x39', '0x36', '0x34'] // password as hexadecimal integer literal string array (Begins with the 0 digit followed by either an x or X, followed by any combination of the digits 0 through 9 and the letters a through f or A through F.)
  }

  // Status messages
  openLockStatus: string;
  echoStatus: string;
  batteryStatus: string;
  lockedStatus: string;
  closeLockStatus: string;

  constructor() {}

  /**
   * Test Methode
   * 
   * Call this methode to make sure you can communicate with the plugin.
   * Result should be by success: {"value":"Hello back from own-2-mesh plugin!"}
   * 
   * Result: {"value":string}
   */
  echo() {
    Own2MeshOkLokPlugin.echo({
        value: 'Hello Own2MeshOkLokPlugin!'
    }).then(result => {
        this.echoStatus = result.value;
    });
  }

  /**
   * Open lock
   * 
   * Result: {"opened":boolean}
   */
  openLock() {
    Own2MeshOkLokPlugin.open({
        name: this.lockOKGSS101.name,
        address: this.lockOKGSS101.address,
        secret: this.lockOKGSS101.secret,
        pw: this.lockOKGSS101.pw
    }).then(result => {
        this.openLockStatus = result.opened;
    });
  }

  /**
   * Get battery percentage
   * 
   * INFO: Some locks don't support this. They will always return {"percentage":0}
   * 
   * Result: {"percentage":number}
   */
  batteryInfo() {
    Own2MeshOkLokPlugin.battery_status({
      name: this.lockOKGSS101.name,
      address: this.lockOKGSS101.address,
      secret: this.lockOKGSS101.secret,
    }).then(result => {
      this.batteryStatus = result.percentage;
    });
  }

  /**
   * Get lock status from lock
   * 
   * INFO: Some locks don't support this. They will always return {"locked":false}
   * 
   * Result: {"locked":boolean}
   */
  lockStatus() {
    Own2MeshOkLokPlugin.lock_status({
      name: this.lockOKGSS101.name,
      address: this.lockOKGSS101.address,
      secret: this.lockOKGSS101.secret,
    }).then(result => {
      this.lockedStatus = result.locked;
    });
  }

  /**
   * Close lock
   * 
   * Result: {"closed":boolean}
   */
  closeLock() {
    Own2MeshOkLokPlugin.close({
        name: this.lockOKGSS101.name,
        address: this.lockOKGSS101.address,
        secret: this.lockOKGSS101.secret,
        pw: this.lockOKGSS101.pw
    }).then(result => {
        this.openLockStatus = result.closed;
    });
  }
}
