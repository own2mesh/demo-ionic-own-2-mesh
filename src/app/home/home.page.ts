import { Component, OnInit, ViewChild } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { LockService } from '../services/lock.service';
import { Lock } from '../models/lock';
import { IonContent } from '@ionic/angular';
import { LockPlugin } from '../models/lock-plugin';
const { Own2MeshOkLokPlugin } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  // Example Lock
  public lock: Lock;
  public locks: Lock[];

  // Status messages
  openLockStatus: string;
  echoStatus: string;
  batteryStatus: string;
  lockedStatus: string;
  closeLockStatus: string;

  constructor(
    private lockService: LockService
  ) { }

  ngOnInit(): void {
    this.lockService.getLock('AUAS00000014').then((lock) => {
      this.lock = lock;
      console.log(this.lock);
      this.lockService.getLocks().then((locks) => {
        this.locks = locks;
      });
    });
  }

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
    }).then((result: LockPlugin) => {
      this.echoStatus = result.value;
    });
  }

  /**
   * Open lock
   * 
   * Result: {"opened":boolean}
   */
  openLock() {
    console.log('try to open lock ' + this.lock.id + '...');
    Own2MeshOkLokPlugin.open({
      name: this.lock.name,
      address: this.lock.mac,
      secret: this.lock.secretHexaDecimal,
      pw: this.lock.passwordHexaDecimal
    }).then((result: LockPlugin) => {
      console.log('result', result);
      this.openLockStatus = 'open';
    }, (error: string) => {
      console.error(error);
      this.openLockStatus = error;
    });
  }

  /**
   * Get battery percentage
   * INFO: Some locks don't support this. They will always return {"percentage":0}
   * Result: {"percentage":number}
   */
  batteryInfo() {
    Own2MeshOkLokPlugin.battery_status({
      name: this.lock.name,
      address: this.lock.mac,
      secret: this.lock.secretHexaDecimal,
    }).then((result: LockPlugin) => {
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
      name: this.lock.name,
      address: this.lock.mac,
      secret: this.lock.secretHexaDecimal,
    }).then((result: LockPlugin) => {
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
      name: this.lock.name,
      address: this.lock.mac,
      secret: this.lock.secretHexaDecimal,
      pw: this.lock.passwordHexaDecimal
    }).then((result: LockPlugin) => {
      this.openLockStatus = result.closed;
    });
  }

  select(l: Lock) {
    this.lock = this.locks.find(lock => lock.id === l.id);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
