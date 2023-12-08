import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactFourComponent } from './new-contact-four.component';

describe('NewContactFourComponent', () => {
  let component: NewContactFourComponent;
  let fixture: ComponentFixture<NewContactFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
