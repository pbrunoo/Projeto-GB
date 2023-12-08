import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTicketTresComponent } from './novo-ticket-tres.component';

describe('NovoTicketDoisComponent', () => {
  let component: NovoTicketTresComponent;
  let fixture: ComponentFixture<NovoTicketTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTicketTresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTicketTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
