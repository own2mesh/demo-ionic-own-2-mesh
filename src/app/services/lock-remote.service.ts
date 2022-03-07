import { Injectable } from '@angular/core';
import { Lock } from '../models/lock';

@Injectable({
  providedIn: 'root'
})
/**
 * Remote Lock Service retrieves Locks from Own2Mesh API
 */
export class LockRemoteService {

  public searchingLocks: boolean; // currently unused => show loading spinner while true
  public foundLocks: boolean;
  public message: string;

  constructor() { }

  public async getLocks(): Promise<Lock[]> {
    return [];
  }

  public async getLock(id: string): Promise<Lock> {
    return null;
  }
}
