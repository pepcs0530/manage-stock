import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddriceComponent } from './addrice.component';

describe('AddriceComponent', () => {
  let component: AddriceComponent;
  let fixture: ComponentFixture<AddriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
