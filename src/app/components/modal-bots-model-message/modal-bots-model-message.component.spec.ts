import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBotsModelMessageComponent } from './modal-bots-model-message.component';

describe('ModalBotsModelMessageComponent', () => {
  let component: ModalBotsModelMessageComponent;
  let fixture: ComponentFixture<ModalBotsModelMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBotsModelMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBotsModelMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
