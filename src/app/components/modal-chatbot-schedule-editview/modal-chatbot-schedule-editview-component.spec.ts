import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChatBotScheduleEditViewComponent } from './modal-chatbot-schedule-editview-component';

describe('ModalChatBotScheduleComponent', () => {
  let component: ModalChatBotScheduleEditViewComponent;
  let fixture: ComponentFixture<ModalChatBotScheduleEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChatBotScheduleEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChatBotScheduleEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
