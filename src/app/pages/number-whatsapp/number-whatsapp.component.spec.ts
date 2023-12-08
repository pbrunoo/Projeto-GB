import { NumberWhatsappComponent } from './number-whatsapp.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NumberWhatsappComponent', () => {
  let component: NumberWhatsappComponent;
  let fixture: ComponentFixture<NumberWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
