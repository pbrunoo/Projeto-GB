import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownGreetingComponent } from './drop-down-greeting.component';

describe('DropDownGreetingComponent', () => {
  let component: DropDownGreetingComponent;
  let fixture: ComponentFixture<DropDownGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownGreetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
