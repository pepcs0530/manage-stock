import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComingFormComponent } from './add-product-coming-form.component';

describe('AddProductComingFormComponent', () => {
  let component: AddProductComingFormComponent;
  let fixture: ComponentFixture<AddProductComingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductComingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
