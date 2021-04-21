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

  public searchingLocks: boolean; // true while service is searching for locks / false when locks have been found or error occurred
  public foundLocks: boolean; // true when locks have been found
  public message: string; // error message to display, when error occurs

  private locks: Lock[] = null; // all locks
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * read and display the locks from insisde the json file
   * @param path to json file
   */
  private async initLocks(path: string): Promise<void> {
    this.message = null;
    this.foundLocks = false;
    this.searchingLocks = true;
    try {
      const locks = await this.readLocksFromJson(path);
      this.processLocks(locks);
    } catch (error) {
      this.processError(error);
      // setTimeout(_ => resolve(this.initLocks(LOCKFILEEXAMPLE)), 10000); // comment this line in to display a list of example locks
    }
  }

  /**
   * take the locks an add the necessary infos to them
   * @param locks lock array
   */
  private processLocks(locks: Lock[]) {
    this.foundLocks = true;
    this.searchingLocks = false;
    this.locks = locks;
    this.locks.forEach((lock: Lock) => {
      lock = this.convertSecretAndPasswordToHexadecimal(lock);
      lock = this.addNameToLock(lock, 'OKGSS101'); // OKGSS101 this is the name all locks should have to connect them via Bluetooth
    });
    console.log('...initiated local locks!');
  }

  /**
   * react to an error
   * @param error error that occurred
   * @returns void
   */
  private processError(error: any): void {
    this.foundLocks = false;
    this.searchingLocks = false;
    switch (error.status) {
      case 404:
        this.message = this.getFileNotFoundMessage();
        break;
      default:
        console.log('UNKNWON ERROR OCCURED');
        break;
    }
    return;
  }

  /**
   * get all locks
   * @returns array of locks
   */
  public async getLocks(): Promise<Lock[]> {
    if (!this.locks) {
      console.log('waiting');
      await this.initLocks(LOCKFILE);
    }
    return this.locks;
  }

  /**
   * get lock by id
   * @param id id of lock
   * @returns Lock
   */
  public async getLock(id: Readonly<string>): Promise<Lock> {
    if (!this.locks) {
      console.log('waiting');
      await this.initLocks(LOCKFILE);
    }
    return this.locks.find(lock => lock.id === id);
  }

  /**
   * read locks from a json file
   * @param path json file path
   * @returns Array of read locks
   */
  private readLocksFromJson(path: string): Promise<Lock[]> {
    return this.httpClient.get<Lock[]>(path).toPromise();
  }

  /**
   * add a name to a lock
   * @param lock lock to modify
   * @param name name to add
   * @returns modified lock
   */
  private addNameToLock(lock: Readonly<Lock>, name: Readonly<string>): Lock {
    const lockWithName: Lock = lock;
    lockWithName.name = name;
    return lockWithName;
  }

  /**
   * to open a lock the secret and passord of a lock have to in hexadecimal representation
   * this function converts them to hexadecimal representation
   * @param lock the lock to modify
   * @returns modified lock
   */
  private convertSecretAndPasswordToHexadecimal(lock: Readonly<Lock>): Lock {
    const lockHex: Lock = lock;
    lockHex.secretHexaDecimal = [];
    lockHex.passwordHexaDecimal = [];
    lockHex.secret.forEach(num => lockHex.secretHexaDecimal.push(this.convertNumberToHexString(num)));
    lockHex.password.forEach(num => lockHex.passwordHexaDecimal.push(this.convertNumberToHexString(num)));
    return lockHex;
  }

  /**
   * converts a number from decimal to hexadecimal
   * @param num any number in decimal rpresentation
   * @returns the number as string in hexadecimal representation
   */
  private convertNumberToHexString(num: Readonly<number>): string {
    const hexString = num.toString(16);
    return '0x' + (hexString.length === 1 ? '0' + hexString : hexString);
  }

  private getFileNotFoundMessage(): string {
    let message: string;
    message = `ERROR<hr>COULD NOT FIND THE FILE ${LOCKFILE}`;
    message += '<p><i>german</i></p>';
    message += '<p>Du musst eine Datei names \'locks.json\' innerhalb des Ordners \'/src/assets/locks\' erstellen.</p>';
    message += '<p>Kopiere für den Anfang den Inhalt der Datei \'locks.example.json\' in die Datei \'locks.json\' hinein.</p>';
    message += '<p>Wenn du ein Schloss / Schlösser besitzt, füge die Daten in die \'locks.json\' Datei ein.</p>';
    message += '<p>Baue oder starte die App danach neu (ionic serve/build).</p>';
    message += '<p><i>english</i></p>';
    message += '<p>You have to create a file named \'locks.json\' inside the folder \'/src/assets/locks\'.</p>';
    message += '<p>To get started, copy the contents of the \'locks.example.json\' file into \'locks.json\'.</p>';
    message += '<p>If you have a lock / locks, add the data into the \'locks.json\' file.</p>';
    message += '<p>Rebuild / Restart the app afterwards (ionic serve/build).</p>';
    return message;
  }
}
