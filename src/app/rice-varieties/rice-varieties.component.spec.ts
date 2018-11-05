import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiceVarietiesComponent } from './rice-varieties.component';

describe('RiceVarietiesComponent', () => {
  let component: RiceVarietiesComponent;
  let fixture: ComponentFixture<RiceVarietiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiceVarietiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiceVarietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
