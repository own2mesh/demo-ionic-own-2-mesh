import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonContent } from '@ionic/angular';
import { Lock } from '../models/lock';
import { LockPlugin } from '../models/lock-plugin';
import { LockService } from '../services/lock.service';
import { OKLOK, Method, Parameters, Return } from 'capacitor-oklok-v2';
const { Own2MeshOkLokPlugin } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit
{

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

  ngOnInit(): void
  {
    this.lockService.getLocks().then((locks) =>
    {
      this.locks = locks;
      this.lockSelected = locks && locks.length ? locks[ 0 ] : null;
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
  echo()
  {
    Own2MeshOkLokPlugin.echo({
      value: 'Hello Own2MeshOkLokPlugin!'
    }).then((result: LockPlugin) =>
    {
      this.echoStatus = result.value;
    });
  }

  /**
   * Open lock
   *
   * Result: {"opened":boolean}
   */
  openLock()
  {
    const lock: Lock = this.lockSelected;
    OKLOK.request({
      methods: [ Method.OPEN ],
      parameters: new Parameters(
        lock.modelName,
        lock.mac,
        lock.secret.join(','),
        lock.password.join(',')
      )
    })
      .then((result: Return) =>
      {
        this.openLockStatus = 'Open';
      })
      .catch((error) =>
      {
        this.openLockStatus = 'Error';
      });
  }

  /**
   * Get battery percentage
   * INFO: Some locks don't support this. They will always return {"percentage":0}
   * Result: {"percentage":number}
   */
  batteryInfo()
  {
    const lock: Lock = this.lockSelected;
    OKLOK.request({
      methods: [ Method.GET_BATTERY ],
      parameters: new Parameters(
        lock.modelName,
        lock.mac,
        lock.secret.join(',')
      )
    })
      .then((result: Return) =>
      {
        this.batteryStatus = String(result.battery);
      })
      .catch((error) =>
      {
        this.batteryStatus = 'Error';
      });
  }

  /**
   * Get lock status from lock
   *
   * INFO: Some locks don't support this. They will always return {"locked":false}
   *
   * Result: {"locked":boolean}
   */
  lockStatus()
  {
    const lock: Lock = this.lockSelected;
    OKLOK.request({
      methods: [ Method.GET_STATUS ],
      parameters: new Parameters(
        lock.modelName,
        lock.mac,
        lock.secret.join(',')
      )
    })
      .then((result: Return) =>
      {
        this.lockedStatus = String(result.isLocked);
      })
      .catch((error) =>
      {
        this.lockedStatus = 'Error';
      });
  }

  /**
   * Close lock
   *
   * Result: {"closed":boolean}
   */
  closeLock()
  {
    const lock: Lock = this.lockSelected;
    OKLOK.request({
      methods: [ Method.CLOSE ],
      parameters: new Parameters(
        lock.modelName,
        lock.mac,
        lock.secret.join(',')
      )
    })
      .then((result: Return) =>
      {
        this.closeLockStatus = 'Closed';
      })
      .catch((error) =>
      {
        this.closeLockStatus = 'Error';
      });
  }

  test()
  {
    const lock: Lock = this.lockSelected;
    OKLOK.request({
      methods: [ Method.OPEN, Method.GET_BATTERY ],
      parameters: new Parameters(
        lock.modelName,
        lock.mac,
        lock.secret.join(','),
        lock.password.join(',')
      )
    })
      .then((result: Return) =>
      {
        console.warn(result);
        if (result.battery) {
          this.batteryStatus = String(result.battery);
        }
      })
      .catch((error) =>
      {
        console.error(error);
      });
  }

  select(l: Lock)
  {
    this.lockSelected = this.locks.find(lock => lock.id === l.id);
  }

  scrollToTop()
  {
    setTimeout(_ => this.content.scrollToTop(750), 250);
  }
}
