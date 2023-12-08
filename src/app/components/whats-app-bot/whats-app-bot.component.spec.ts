import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsAppBotComponent } from './whats-app-bot.component';

describe('WhatsAppBotComponent', () => {
  let component: WhatsAppBotComponent;
  let fixture: ComponentFixture<WhatsAppBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsAppBotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsAppBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
