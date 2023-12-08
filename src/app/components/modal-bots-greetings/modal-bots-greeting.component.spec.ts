import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBotsGreetingComponent } from './modal-bots-greeting.component';

describe('ModalRegisterCompanyComponent', () => {
  let component: ModalBotsGreetingComponent;
  let fixture: ComponentFixture<ModalBotsGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBotsGreetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBotsGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
