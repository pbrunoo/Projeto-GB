import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNumberWhatsappComponent } from './modal-number-whatsapp.component';

describe('ModalRegisterCompanyComponent', () => {
  let component: ModalNumberWhatsappComponent;
  let fixture: ComponentFixture<ModalNumberWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNumberWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNumberWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
