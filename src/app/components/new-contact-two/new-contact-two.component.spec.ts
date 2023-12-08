import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactTwoComponent } from './new-contact-two.component';

describe('NewContactTwoComponent', () => {
  let component: NewContactTwoComponent;
  let fixture: ComponentFixture<NewContactTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
