import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportContactComponent } from './modal-import-contact.component';

describe('ModalRegisterCompanyComponent', () => {
  let component: ModalImportContactComponent;
  let fixture: ComponentFixture<ModalImportContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImportContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImportContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
