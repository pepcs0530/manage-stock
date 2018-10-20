import { TestBed, inject } from '@angular/core/testing';

import { AddRiceVarietiesService } from './add-rice-varieties.service';

describe('AddRiceVarietiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddRiceVarietiesService]
    });
  });

  it('should be created', inject([AddRiceVarietiesService], (service: AddRiceVarietiesService) => {
    expect(service).toBeTruthy();
  }));
});
