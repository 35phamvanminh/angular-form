import { TestBed } from '@angular/core/testing';

import { KeepValueService } from './keep-value.service';

describe('KeepValueService', () => {
  let service: KeepValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
