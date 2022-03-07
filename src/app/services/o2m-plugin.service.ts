import {Injectable} from '@angular/core';
import {LockPlugin} from '../models/lock-plugin';
import {Plugins} from '@capacitor/core';
import {Lock} from '../models/lock';

const {Own2MeshOkLokPlugin} = Plugins;
const ERROR_MESSAGE_MULTIPLE_PLUGIN_CALLS = 'A plugin call is already executed. Wait until it ends!';

@Injectable({
    providedIn: 'root'
})
export class O2mPluginService {


    // Do not allow more then one plugin instance
    private pluginCallActive = false;

    constructor() {
    }

    /**
     * Test Methode
     *
     * Call this methode to make sure you can communicate with the plugin.
     * Result should be by success: {"value":"Echo: {{your-value}}"}
     *
     * @param value: your value which will be echoed
     * Result: {"value":string}
     */
    echo(value: string): Promise<LockPlugin> {
        return new Promise<LockPlugin>(((resolve, reject) => {
            if (!this.pluginCallActive) {
                this.pluginCallActive = true;
                Own2MeshOkLokPlugin.echo({
                    value
                }).then((result: LockPlugin) => {
                    this.pluginCallActive = false;
                    resolve(result);
                }, (error: string) => {
                    this.pluginCallActive = false;
                    reject(error);
                });
            } else {
                reject(ERROR_MESSAGE_MULTIPLE_PLUGIN_CALLS);
            }
        }));
    }

    /**
     * Open lock
     *
     * Result: {"opened":boolean}
     */
    openLock(lock: Lock): Promise<LockPlugin> {
        return new Promise<LockPlugin>(((resolve, reject) => {
            if (!this.pluginCallActive) {
                this.pluginCallActive = true;
                Own2MeshOkLokPlugin.open({
                    name: lock.modelName,
                    address: lock.mac,
                    secret: lock.secretHexaDecimal,
                    pw: lock.passwordHexaDecimal
                }).then((result: LockPlugin) => {
                    this.pluginCallActive = false;
                    resolve(result);
                }, (error: string) => {
                    this.pluginCallActive = false;
                    reject(error);
                });
            } else {
                reject(ERROR_MESSAGE_MULTIPLE_PLUGIN_CALLS);
            }
        }));
    }

    /**
     * Get battery percentage
     * INFO: Some locks don't support this. They will always return {"percentage":0}
     *
     * Result: {"percentage":number}
     */
    batteryInfo(lock: Lock): Promise<LockPlugin> {
        return new Promise<LockPlugin>(((resolve, reject) => {
            if (!this.pluginCallActive) {
                this.pluginCallActive = true;
                Own2MeshOkLokPlugin.battery_status({
                    name: lock.modelName,
                    address: lock.mac,
                    secret: lock.secretHexaDecimal
                }).then((result: LockPlugin) => {
                    this.pluginCallActive = false;
                    resolve(result);
                }, (error: string) => {
                    this.pluginCallActive = false;
                    reject(error);
                });
            } else {
                reject(ERROR_MESSAGE_MULTIPLE_PLUGIN_CALLS);
            }
        }));
    }

    /**
     * Get lock status from lock
     *
     * INFO: Some locks don't support this. They will always return {"locked":false}
     *
     * Result: {"locked":boolean}
     */
    lockStatus(lock: Lock): Promise<LockPlugin> {
        return new Promise<LockPlugin>(((resolve, reject) => {
            if (!this.pluginCallActive) {
                this.pluginCallActive = true;
                Own2MeshOkLokPlugin.lock_status({
                    name: lock.modelName,
                    address: lock.mac,
                    secret: lock.secretHexaDecimal,
                    pw: lock.passwordHexaDecimal
                }).then((result: LockPlugin) => {
                    this.pluginCallActive = false;
                    resolve(result);
                }, (error: string) => {
                    this.pluginCallActive = false;
                    reject(error);
                });
            } else {
                reject(ERROR_MESSAGE_MULTIPLE_PLUGIN_CALLS);
            }
        }));

    }

    /**
     * Close lock
     *
     * Result: {"closed":boolean}
     */
    closeLock(lock: Lock): Promise<LockPlugin> {
        return new Promise<LockPlugin>(((resolve, reject) => {
            if (!this.pluginCallActive) {
                this.pluginCallActive = true;
                Own2MeshOkLokPlugin.close({
                    name: lock.modelName,
                    address: lock.mac,
                    secret: lock.secretHexaDecimal,
                    pw: lock.passwordHexaDecimal
                }).then((result: LockPlugin) => {
                    this.pluginCallActive = false;
                    resolve(result);
                }, (error: string) => {
                    this.pluginCallActive = false;
                    reject(error);
                });
            } else {
                reject(ERROR_MESSAGE_MULTIPLE_PLUGIN_CALLS);
            }
        }));
    }
}
