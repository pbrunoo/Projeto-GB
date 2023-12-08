import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownContactWhatsapp } from './drop-down-contact-whatsapp.component';

describe('DropDownContactWhatsapp', () => {
  let component: DropDownContactWhatsapp;
  let fixture: ComponentFixture<DropDownContactWhatsapp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownContactWhatsapp ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownContactWhatsapp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
