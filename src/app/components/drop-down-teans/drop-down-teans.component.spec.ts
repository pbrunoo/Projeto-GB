import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownTeansComponent } from './drop-down-teans.component';

describe('DropDownTeansComponent', () => {
  let component: DropDownTeansComponent;
  let fixture: ComponentFixture<DropDownTeansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownTeansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownTeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
