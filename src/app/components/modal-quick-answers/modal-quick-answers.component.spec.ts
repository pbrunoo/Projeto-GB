import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmodalQuickAnswersComponent } from './modal-quick-answers.component';

describe('ModalmodalQuickAnswersComponent', () => {
  let component: ModalmodalQuickAnswersComponent;
  let fixture: ComponentFixture<ModalmodalQuickAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalmodalQuickAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmodalQuickAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
