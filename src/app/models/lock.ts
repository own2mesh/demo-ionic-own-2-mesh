import { LockLocal } from './lock-local';
import { LockRemote } from './lock-remote';
export interface Lock extends LockLocal, LockRemote { }
