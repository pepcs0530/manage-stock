import { TestBed, inject } from '@angular/core/testing';

import { AddProductComingService } from './add-product-coming.service';

describe('AddProductComingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProductComingService]
    });
  });

  it('should be created', inject([AddProductComingService], (service: AddProductComingService) => {
    expect(service).toBeTruthy();
  }));
});
