import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactFiveComponent } from './new-contact-five.component';

describe('NewContactFiveComponent', () => {
  let component: NewContactFiveComponent;
  let fixture: ComponentFixture<NewContactFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
