import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactThreeComponent } from './new-contact-three.component';

describe('NewContactThreeComponent', () => {
  let component: NewContactThreeComponent;
  let fixture: ComponentFixture<NewContactThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContactThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
