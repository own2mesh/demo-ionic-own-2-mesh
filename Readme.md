# Own2Mesh - Ionic Demo App
Demo App for own2mesh capacitor plugin.

Find the plugin here: https://www.npmjs.com/package/own2mesh-capacitor-plugin-oklok
#
##### Table of Contents  
* [Install](#install) or 
* [Create own app](#create-your-own)
    * [Add a plattform](#add-a-platform)  
        * [iOS](#ios)  
        * [Android](#android)
    * [Usage](#usage)
        * [Import](#import)
        * [Example lock](#example-lock)
* [Build](#build-your-ionic-app)
* [Methods](#methods)
    * [echo()](#echo)
    * [battery_status()](#battery_status)
    * [lock_status()](#lock_status)
    * [close()](#close)

## Install
You can find the demo app here: https://gitlab.edvsz.hs-osnabrueck.de/own2mesh/demo-ionic-own-2-mesh
* Clone & use our Demo App
* install Dependencies
> ```
> git clone https://gitlab.edvsz.hs-osnabrueck.de/own2mesh/demo-ionic-own-2-mesh.git
> cd ./demo-ionic-own-2-mesh
> npm i
> ```
> and then follow the instructions of the app!
* or create your own App

## Create your own

> Start with a new ionic app
> ```
> ionic start myApp blank --capacitor
> ```

> Choose the framework you like (angular was used in the [demo](#demo-app) application)

> Go to the project folder
> ```
> cd myApp
> ```

> Install the own2mesh-capacitor-plugin
> ```
> npm i own2mesh-capacitor-plugin-oklok
> ```

#
### Add a platform
#

#### IOS 

> ##### Add ios to your app
> >*You may need to update your podfile*
> ```
> npx cap add ios
> ```


> ##### Custom IOS Target Property's Privacy
> The plugin uses bluetooth to connect to locks. Therefore it is necessary to have this information in the Info.plist
>
> Add the following line to : *myApp/ios/App/App/Info.plist*
> ```
> <key>NSBluetoothAlwaysUsageDescription</key>
> <string>Our app uses bluetooth to find, connect and transfer data between different devices</string>
> ```

> ##### Sync
>
> `npx cap sync`


> ##### Open your app in xCode
> Don't forget to add yourself to the team and choose your bundle identifier
>
> `npx cap open ios`
#



#### Android

> ##### Add android to your app
> `npx cap add android`

> ##### Sync
> `npx cap sync`

> ##### Open your app
> `npx cap open android`
#

> ##### Add our installed plugin to the MainActivity
>
> File Path: *myApp/android/app/src/main/java/io/ionic/starter/MainActivity.java*
>
> `import de.own2mesh.plugin.oklok.Own2MeshOkLokPlugin;`
>
> `add(Own2MeshOkLokPlugin.class);`
>
> The MainActivity.java should look like this:
> ```java
> package de.own2mesh.own2mesh_demo;
>
>import android.os.Bundle;
>
> import com.getcapacitor.BridgeActivity;
> import com.getcapacitor.Plugin;
>
> import java.util.ArrayList;
>
> import de.own2mesh.plugin.oklok.Own2MeshOkLokPlugin;
>
> public class MainActivity extends BridgeActivity {
>  @Override
>  public void onCreate(Bundle savedInstanceState) {
>    super.onCreate(savedInstanceState);
>
>    // Initializes the Bridge
>    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
>      // Additional plugins you've installed go here
>      // Ex: add(TotallyAwesomePlugin.class);
>      add(Own2MeshOkLokPlugin.class);
>    }});
>  }
> }
>```
#

### Usage

#### Import
> Import the plugin
> ```typescript
> import {Plugins} from '@capacitor/core';
> const {Own2MeshOkLokPlugin} = Plugins;
> ```

> How to use a methode
> ```typescript
> Own2MeshOkLokPlugin.theMethodeYouLike();
> ```
#

#### Example lock

```typescript
lockName = {
    name: string, // Physical lock name
    address: string, // MAC Address (for android)
    secret: string[16], // lock key as hexadecimal integer literal string array[16 items] (Begins with the 0 digit followed by either an x or X, followed by any combination of the digits 0 through 9 and the letters a through f or A through F.)
    pw: string[6] // password as hexadecimal integer literal string array[6 items] (Begins with the 0 digit followed by either an x or X, followed by any combination of the digits 0 through 9 and the letters a through f or A through F.)
}
```

> __Important__ Hex Strings have to start with a leading 0 if they are single digit

```typescript
lockOKGSS101 = {
    name: 'OKGSS101',
    address: 'F8:45:65:64:CC:B4',
    secret: ['0x4c', '0x5f', '0x0c', '0x3c', '0x4c', '0x28', '0x53', '0x24', '0x23', '0x36', '0x12', '0x5b', '0x33', '0x59', '0x21', '0x04'],
    pw: ['0x33', '0x32', '0x31', '0x39', '0x33', '0x37'] 
}
```
#

# Build your Ionic app
> ```
> ionic build
> ```
> Now you are ready to use the own2mesh-capacitor-plugin-oklok
>
> NOTE: *After you changed something run:*
>
> ```
> ionic build
> npx cap sync
> npx cap open "platform"
> ```

#

# Methods
## echo()
* *Test Methode*

Call this methode to make sure you can communicate with the plugin.
Result by success: {"value":"Hello back from own-2-mesh plugin!"}

> ##### Plugin Methode
> ```
> echo(options: { value: string }): Promise<{ value: string }>;
> ```
> ###### Example
> ```typescript
> echo() {
>    Own2MeshOkLokPlugin.echo({
>        value: 'Hello Own2MeshOkLokPlugin!'
>    }).then(result => {
>        console.log(result.value);
>    });
>}
>```
#

## open()
* *Open lock*

> Call this methode to open a lock.

> ##### Plugin Methode
> ```
> open(options: { name: string, address: string, secret: string[], pw: string[] }): Promise<{ opened: boolean }>;
> ```
> ###### Example
> ```typescript
> openLock() {
>    Own2MeshOkLokPlugin.open({
>        name: lock.modelName,
>        address: lock.address,
>        secret: lock.secret,
>        pw: lock.pw
>    }).then(result => {
>        console.log(result.opened);
>    });
>}
>```
#

## battery_status()
* *Get battery status*

> Call this methode to get the battery status.

> ##### Plugin Methode
> ```
> battery_status(options: { name: string, address: string, secret: string[] }): Promise<{ percentage: number }>;
> ```
> ###### Example
> ```typescript
> batteryInfo() {
>    Own2MeshOkLokPlugin.battery_status({
>      name: lock.name,
>      secret: lock.secret,
>    }).then(result => {
>      console.log(result.percentage);
>    });
> }
> ```
#

## lock_status()
* *Get lock status*

> Call this methode to get the lock status.

> ##### Plugin Methode
> ```
> lock_status(options: { name: string, address: string, secret: string[] }): Promise<{ locked: boolean }>;
> ```
> ###### Example
> ```typescript
> lockStatus() {
> Own2MeshOkLokPlugin.lock_status({
>      name: lock.modelName,
>      secret: lock.secret,
>    }).then(result => {
>      console.log(result.locked);
>    });
> }
> ```
#


## close()
* *Get lock status*

> Call this methode to close a lock.

> ##### Plugin Methode
> ```
> close(options: { name: string, address: string, secret: string[] }): Promise<{ closed: boolean }>;
> ```
> ###### Example
> ```typescript
> closeLock() {
>    Own2MeshOkLokPlugin.close({
>        name: lock.name,
>        address: lock.address,
>        secret: lock.secret,
>        pw: lock.pw
>    }).then(result => {
>        this.openLockStatus = result.closed;
>    });
> }
> ```
#

