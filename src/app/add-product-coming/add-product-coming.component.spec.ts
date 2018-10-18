import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComingComponent } from './add-product-coming.component';

describe('AddProductComingComponent', () => {
  let component: AddProductComingComponent;
  let fixture: ComponentFixture<AddProductComingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductComingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
