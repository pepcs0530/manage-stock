import { TestBed, inject } from '@angular/core/testing';

import { RiceService } from './rice.service';

describe('RiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiceService]
    });
  });

  it('should be created', inject([RiceService], (service: RiceService) => {
    expect(service).toBeTruthy();
  }));
});
