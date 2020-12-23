import { Injectable } from '@angular/core';
import { Lock } from '../models/lock';
import { LockLocalService } from './lock-local.service';
import { LockRemoteService } from './lock-remote.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * get Locks from either local or remote Lock Service
 */
export class LockService extends LockLocalService /** LockRemoteService */ {

  constructor(
    private httpClient: HttpClient
  ) {
    super(httpClient);
  }

  /**
   * get all locks
   */
  public async getLocks(): Promise<Array<Lock>> {
    return super.getLocks();
  }

  /**
   * get specified lock
   * @param id of the lock
   */
  public async getLock(id: string): Promise<Lock> {
    return super.getLock(id);
  }
}
