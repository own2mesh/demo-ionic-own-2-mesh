import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lock } from '../models/lock';
import { Observable } from 'rxjs';

const LOCKFILE = '../../assets/locks/locks.json';
const LOCKFILEEXAMPLE = '../../assets/locks/locks.example.json';

@Injectable({
  providedIn: 'root'
})
/**
 * Local Lock Service retrieves Locks from local json file
 */
export class LockLocalService {

  public searchingLocks: boolean; // currently unused => show loading spinner while true
  public foundLocks: boolean;
  public message: string;

  private locks: Lock[] = null;
  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  private async initLocks(path: string): Promise<void> {
    this.message = null;
    this.foundLocks = false;
    this.searchingLocks = true;
    return new Promise<void>((resolve) => {
      this.readLocksFromJson(path).subscribe((locks) => {
        this.processLocks(locks);
        resolve();
      }, error => {
        this.processError(error);
        setTimeout(_ => resolve(this.initLocks(LOCKFILEEXAMPLE)), 10000); // show message before getting example locks
      });
    });
  }

  private processLocks(locks: Lock[]) {
    this.foundLocks = true;
    this.searchingLocks = false;
    this.locks = locks;
    this.locks.forEach((lock: Lock) => {
      lock = this.convertSecretAndPasswordToHexadecimal(lock);
      lock = this.addNameToLock(lock, 'OKGSS101');
    });
    console.log('...initiated local locks!');
  }

  private processError(error: any) {
    this.foundLocks = false;
    this.searchingLocks = false;
    switch (error.status) {
      case 404:
        this.message = `ERROR<hr>COULD NOT FIND THE FILE ${LOCKFILE}<br>FOR MORE INFOS OPEN THE BROWSERS CONSOLE.<br>LOADING LOCK EXAMPLES....`;
        console.error(`COULD NOT FIND THE FILE ${LOCKFILE}! => NOW LOADING LOCK EXAMPLES. For more infos look below.`);
        console.error('DE: Du musst eine Datei names \'locks.json\' innerhalb des Ordners \'/src/assets/locks\' erstellen.');
        console.error('DE: Kopiere für den Anfang den Inhalt der Datei \'locks.example.json\' in die Datei \'locks.json\' hinein.');
        console.error('DE: Wenn du ein Schloss / Schlösser besitzt, füge die Daten in die \'locks.json\' Datei ein.');
        console.error('DE: Baue oder starte die App danach neu (ionic serve/build).');
        console.error('EN: You have to create a file named \'locks.json\' inside the folder \'/src/assets/locks\'.');
        console.error('EN: To get started, copy the contents of the \'locks.example.json\' file into \'locks.json\'.');
        console.error('EN: If you have a lock / locks, add the data into the \'locks.json\' file.');
        console.error('EN: Rebuild / Restart the app afterwards (ionic serve/build).');
        break;
      default:
        console.log('UNKNWON ERROR OCCURED');
        break;
    }
    return;
  }

  public async getLocks(): Promise<Lock[]> {
    if (!this.locks) {
      console.log('waiting');
      await this.initLocks(LOCKFILE);
    }
    return this.locks;
  }

  public async getLock(id: Readonly<string>): Promise<Lock> {
    if (!this.locks) {
      console.log('waiting');
      await this.initLocks(LOCKFILE);
    }
    return this.locks.find(lock => lock.id === id);
  }

  private readLocksFromJson(path: string): Observable<Lock[]> {
    return this.http.get<Lock[]>(path);
  }

  private addNameToLock(lock: Readonly<Lock>, name: Readonly<string>) {
    const lockWithName: Lock = lock;
    lockWithName.name = name;
    return lockWithName;
  }

  private convertSecretAndPasswordToHexadecimal(lock: Readonly<Lock>): Lock {
    const lockHex: Lock = lock;
    lockHex.secretHexaDecimal = [];
    lockHex.passwordHexaDecimal = [];
    lockHex.secret.forEach(num => lockHex.secretHexaDecimal.push(this.convertNumberToHexString(num)));
    lockHex.password.forEach(num => lockHex.passwordHexaDecimal.push(this.convertNumberToHexString(num)));
    return lockHex;
  }

  private convertNumberToHexString(num: Readonly<number>): string {
    const hexString = num.toString(16);
    return '0x' + (hexString.length === 1 ? '0' + hexString : hexString);
  }
}
