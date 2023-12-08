import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChatBotScheduleComponent } from './modal-chatbot-schedule-component';

describe('ModalChatBotScheduleComponent', () => {
  let component: ModalChatBotScheduleComponent;
  let fixture: ComponentFixture<ModalChatBotScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChatBotScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChatBotScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
