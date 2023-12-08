import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQrCodeComponent } from './modal-qr-code.component';

describe('ModalDeleteComponent', () => {
  let component: ModalQrCodeComponent;
  let fixture: ComponentFixture<ModalQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQrCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
