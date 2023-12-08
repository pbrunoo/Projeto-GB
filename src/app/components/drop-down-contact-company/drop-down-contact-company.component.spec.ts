import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownContactCompany } from './drop-down-contact-company.component';

describe('DropDownContactWhatsapp', () => {
  let component: DropDownContactCompany;
  let fixture: ComponentFixture<DropDownContactCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownContactCompany ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownContactCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
