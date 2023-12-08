import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDropDownWhatsappComponent } from './status-drop-down-whatsapp.component';

describe('StatusDropDownComponent', () => {
  let component: StatusDropDownWhatsappComponent;
  let fixture: ComponentFixture<StatusDropDownWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDropDownWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDropDownWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
