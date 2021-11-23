import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {Lock} from '../models/lock';
import {LockPlugin} from '../models/lock-plugin';
import {LockService} from '../services/lock.service';
import {O2mPluginService} from '../services/o2m-plugin.service';


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
        public lockService: LockService,
        private own2MeshPluginService: O2mPluginService
    ) {
    }

    ngOnInit(): void {
        this.lockService.getLocks().then((locks) => {
            this.locks = locks;
            this.lockSelected = locks && locks.length ? locks[0] : null;
        });
    }

    /**
     * Test Methode
     *
     */
    echo() {
        this.own2MeshPluginService.echo('Hello Own2MeshOkLokPlugin!')
            .then((result: LockPlugin) => {
                this.echoStatus = result.value;
            }, (error: string) => {
                console.error(error);
            });
    }

    /**
     * Open lock
     */
    openLock() {
        this.own2MeshPluginService.openLock(this.lockSelected)
            .then((result: LockPlugin) => {
                console.log('result', result);
                this.openLockStatus = 'open';
            }, (error: string) => {
                console.error(error);
                this.openLockStatus = error;
            });
    }

    /**
     * Get battery percentage
     */
    batteryInfo() {

        this.own2MeshPluginService.batteryInfo(this.lockSelected)
            .then((result: LockPlugin) => {
                console.log('result', result);
                this.batteryStatus = result.percentage;
            }, (error: string) => {
                console.error(error);
                this.openLockStatus = error;
            });
    }

    /**
     * Get lock status from lock
     */
    lockStatus() {
        this.own2MeshPluginService.lockStatus(this.lockSelected)
            .then((result: LockPlugin) => {
                    console.log('status - success: ', result);
                    this.lockedStatus = result.locked;
            }, (error: string) => {
                    console.log('status - error: ', error);
                    this.lockedStatus = error;
            });
    }

    /**
     * Close lock
     */
    closeLock() {
        this.own2MeshPluginService.lockStatus(this.lockSelected)
            .then((result: LockPlugin) => {
                console.log('status - success: ', result);
                this.openLockStatus = result.closed;
            }, (error: string) => {
                console.log('status - error: ', error);
                this.openLockStatus = error;
            });
    }

    select(l: Lock) {
        this.lockSelected = this.locks.find(lock => lock.id === l.id);
    }

    scrollToTop() {
        setTimeout(_ => this.content.scrollToTop(750), 250);
    }
}
