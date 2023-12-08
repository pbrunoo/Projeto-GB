import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactSixComponent } from './new-contact-six.component';

describe('NewContactSixComponent', () => {
  let component: NewContactSixComponent;
  let fixture: ComponentFixture<NewContactSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
