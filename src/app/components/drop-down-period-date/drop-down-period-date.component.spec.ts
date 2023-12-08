import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownPeriodDateComponent } from './drop-down-period-date.component';

describe('DropDownPeriodDateComponent', () => {
  let component: DropDownPeriodDateComponent;
  let fixture: ComponentFixture<DropDownPeriodDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownPeriodDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownPeriodDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
