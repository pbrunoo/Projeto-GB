import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTicketCincoComponent } from './novo-ticket-cinco.component';

describe('NovoTicketCincoComponent', () => {
  let component: NovoTicketCincoComponent;
  let fixture: ComponentFixture<NovoTicketCincoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTicketCincoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTicketCincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
