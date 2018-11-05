import { TestBed, inject } from '@angular/core/testing';

import { RiceVarietiesService } from './rice-varieties.service';

describe('RiceVarietiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiceVarietiesService]
    });
  });

  it('should be created', inject([RiceVarietiesService], (service: RiceVarietiesService) => {
    expect(service).toBeTruthy();
  }));
});
