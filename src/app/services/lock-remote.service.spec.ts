import { TestBed } from '@angular/core/testing';

import { LockRemoteService } from './lock-remote.service';

describe('LockRemoteService', () => {
  let service: LockRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
