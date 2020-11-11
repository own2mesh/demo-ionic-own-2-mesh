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
        this.locks = this.convertSecretAndPasswordToHexadecimal(locks);
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

  public async getLock(id: string): Promise<Lock> {
    if (!this.locks) {
      console.log('waiting');
      await this.initLocks();
    }
    return this.locks.find(lock => lock.id === id);
  }

  private readLocksFromJson(): Observable<Lock[]> {
    return this.http.get<Lock[]>('../../assets/locks/locks.json');
  }

  private convertSecretAndPasswordToHexadecimal(locks: Lock[]): Lock[] {
    locks.forEach(lock => {
      lock.secretHexaDecimal = [];
      lock.passwordHexaDecimal = [];
      lock.secret.forEach(num => lock.secretHexaDecimal.push(this.convertNumberToHexString(num)));
      lock.password.forEach(num => lock.passwordHexaDecimal.push(this.convertNumberToHexString(num)));
    });
    return locks;
  }

  private convertNumberToHexString(num: number): string {
    const hexString = num.toString(16);
    return '0x' + (hexString.length === 1 ? '0' + num.toString(16) : num.toString(16));
  }
}
