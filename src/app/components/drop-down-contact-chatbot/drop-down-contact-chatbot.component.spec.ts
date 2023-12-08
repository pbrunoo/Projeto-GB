import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownContactChatBotComponent } from './drop-down-contact-chatbot.component';

describe('DropDownContactChatBotComponent', () => {
  let component: DropDownContactChatBotComponent;
  let fixture: ComponentFixture<DropDownContactChatBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownContactChatBotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownContactChatBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
