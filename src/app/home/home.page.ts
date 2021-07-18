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

  /** selected lock (default first in the list) */
  public lockSelected: Lock;
  /** all locks from lock service */
  public locks: Lock[];

  // Status messages
  openLockStatus: string;
  echoStatus: string;
  batteryStatus: string;
  lockedStatus: string;
  closeLockStatus: string;

  constructor(
    public lockService: LockService
  ) { }

  ngOnInit(): void {
    this.lockService.getLocks().then((locks) => {
      this.locks = locks;
      this.lockSelected = locks && locks.length ? locks[0] : null;
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
    console.log('try to open lock ' + this.lockSelected.id + '...', this.lockSelected);
    Own2MeshOkLokPlugin.open({
      name: this.lockSelected.modelName,
      address: this.lockSelected.mac,
      secret: this.lockSelected.secretHexaDecimal,
      pw: this.lockSelected.passwordHexaDecimal
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
      name: this.lockSelected.modelName,
      address: this.lockSelected.mac,
      secret: this.lockSelected.secretHexaDecimal,
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
      name: this.lockSelected.modelName,
      address: this.lockSelected.mac,
      secret: this.lockSelected.secretHexaDecimal,
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
      name: this.lockSelected.modelName,
      address: this.lockSelected.mac,
      secret: this.lockSelected.secretHexaDecimal,
      pw: this.lockSelected.passwordHexaDecimal
    }).then((result: LockPlugin) => {
      this.openLockStatus = result.closed;
    });
  }

  select(l: Lock) {
    this.lockSelected = this.locks.find(lock => lock.id === l.id);
  }

  scrollToTop() {
    setTimeout(_ => this.content.scrollToTop(750), 250);
  }
}
