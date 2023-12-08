import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTicketUmComponent } from './novo-ticket-um.component';

describe('NovoTicketUmComponent', () => {
  let component: NovoTicketUmComponent;
  let fixture: ComponentFixture<NovoTicketUmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTicketUmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTicketUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
