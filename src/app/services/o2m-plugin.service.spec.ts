import { TestBed } from '@angular/core/testing';

import { O2mPluginService } from './o2m-plugin.service';

describe('O2mPluginService', () => {
  let service: O2mPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(O2mPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
