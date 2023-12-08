import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMessageWhatsappComponent } from './drop-down-message-whatsapp.component';

describe('DropDownMessageWhatsappComponent', () => {
  let component: DropDownMessageWhatsappComponent;
  let fixture: ComponentFixture<DropDownMessageWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownMessageWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownMessageWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
