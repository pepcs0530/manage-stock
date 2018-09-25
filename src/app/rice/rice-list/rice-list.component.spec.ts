import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiceListComponent } from './rice-list.component';

describe('RiceListComponent', () => {
  let component: RiceListComponent;
  let fixture: ComponentFixture<RiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
