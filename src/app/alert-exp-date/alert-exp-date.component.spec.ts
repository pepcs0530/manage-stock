import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertExpDateComponent } from './alert-exp-date.component';

describe('AlertExpDateComponent', () => {
  let component: AlertExpDateComponent;
  let fixture: ComponentFixture<AlertExpDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertExpDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertExpDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
