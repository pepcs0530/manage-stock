import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiceComponent } from './add-rice.component';

describe('AddRiceComponent', () => {
  let component: AddRiceComponent;
  let fixture: ComponentFixture<AddRiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
