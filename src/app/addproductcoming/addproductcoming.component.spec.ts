import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductcomingComponent } from './addproductcoming.component';

describe('AddproductcomingComponent', () => {
  let component: AddproductcomingComponent;
  let fixture: ComponentFixture<AddproductcomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductcomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
