import { TestBed } from '@angular/core/testing';

import { LockLocalService } from './lock-local.service';

describe('LockLocalService', () => {
  let service: LockLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
