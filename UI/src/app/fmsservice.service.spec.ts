import { TestBed } from '@angular/core/testing';

import { FMSserviceService } from './fmsservice.service';

describe('FMSserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FMSserviceService = TestBed.get(FMSserviceService);
    expect(service).toBeTruthy();
  });
});
