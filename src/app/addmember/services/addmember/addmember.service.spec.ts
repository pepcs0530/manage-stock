import { TestBed, inject } from '@angular/core/testing';

import { AddmemberService } from './addmember.service';

describe('AddmemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddmemberService]
    });
  });

  it('should be created', inject([AddmemberService], (service: AddmemberService) => {
    expect(service).toBeTruthy();
  }));
});
