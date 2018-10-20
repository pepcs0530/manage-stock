import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiceVarietiesComponent } from './add-rice-varieties.component';

describe('AddRiceVarietiesComponent', () => {
  let component: AddRiceVarietiesComponent;
  let fixture: ComponentFixture<AddRiceVarietiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRiceVarietiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRiceVarietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
