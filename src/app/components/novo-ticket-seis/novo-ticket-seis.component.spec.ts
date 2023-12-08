import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTicketSeisComponent } from './novo-ticket-seis.component';

describe('NovoTicketSeisComponent', () => {
  let component: NovoTicketSeisComponent;
  let fixture: ComponentFixture<NovoTicketSeisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTicketSeisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTicketSeisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
