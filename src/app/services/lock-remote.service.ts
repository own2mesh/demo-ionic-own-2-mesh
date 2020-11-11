import { Injectable } from '@angular/core';
import { Lock } from '../models/lock';

@Injectable({
  providedIn: 'root'
})
/**
 * Remote Lock Service retrieves Locks from Own2Mesh API
 */
export class LockRemoteService {

  constructor() { }

  public async getLocks(): Promise<Lock[]> {
    return [];
  }

  public async getLock(id: string): Promise<Lock> {
    return null;
  }
}
