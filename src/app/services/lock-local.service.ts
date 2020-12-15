import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lock } from '../models/lock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Local Lock Service retrieves Locks from local json file
 */
export class LockLocalService {

  private locks: Lock[] = null;

  constructor(
    private http: HttpClient
  ) { }

  private async initLocks(): Promise<void> {
    console.log('initiating local locks...');
    return new Promise<void>((resolve) => {
      this.readLocksFromJson().subscribe((locks) => {
        this.locks = locks;
        this.locks.forEach((lock: Lock) => {
          lock = this.convertSecretAndPasswordToHexadecimal(lock);
          lock = this.addNameToLock(lock, 'OKGSS101');
        });
        console.log('...initiated local locks!');
        resolve();
      });
    });
  }

  public async getLocks(): Promise<Lock[]> {
    if (!this.locks) {
      console.log('waiting');
      await this.initLocks();
    }
    return this.locks;
  }

  public async getLock(id: Readonly<string>): Promise<Lock> {
    if (!this.locks) {
      console.log('waiting');
      await this.initLocks();
    }
    return this.locks.find(lock => lock.id === id);
  }

  private readLocksFromJson(): Observable<Lock[]> {
    return this.http.get<Lock[]>('../../assets/locks/locks.json');
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
