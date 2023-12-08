import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotsModelMessageComponent } from './bots-model-message.component';

describe('BotsModelMessageComponent', () => {
  let component: BotsModelMessageComponent;
  let fixture: ComponentFixture<BotsModelMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotsModelMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotsModelMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
