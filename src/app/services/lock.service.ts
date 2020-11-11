import { Injectable } from '@angular/core';
import { Lock } from '../models/lock';
import { LockLocalService } from './lock-local.service';
import { LockRemoteService } from './lock-remote.service';

@Injectable({
  providedIn: 'root'
})
/**
 * get Locks from either local or remote Lock Service
 */
export class LockService {

  /**
   * decide wether get local or remote locks
   */
  private remote = false;

  constructor(
    private localLockService: LockLocalService,
    private remoteLockService: LockRemoteService
  ) { }

  /**
   * get all locks
   */
  public async getLocks(): Promise<Array<Lock>> {
    return this.remote
      ? this.remoteLockService.getLocks()
      : this.localLockService.getLocks();
  }

  /**
   * get specified lock
   * @param id of the lock
   */
  public async getLock(id: string): Promise<Lock> {
    return this.remote
      ? this.remoteLockService.getLock(id)
      : this.localLockService.getLock(id);
  }
}
