import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactOneComponent } from './new-contact-one.component';

describe('NewContactOneComponent', () => {
  let component: NewContactOneComponent;
  let fixture: ComponentFixture<NewContactOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
