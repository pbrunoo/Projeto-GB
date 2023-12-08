import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownGroupComponent } from './drop-down-group.component';

describe('DropDownGroupComponent', () => {
  let component: DropDownGroupComponent;
  let fixture: ComponentFixture<DropDownGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
