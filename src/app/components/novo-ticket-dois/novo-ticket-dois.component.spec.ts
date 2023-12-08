import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTicketDoisComponent } from './novo-ticket-dois.component';

describe('NovoTicketDoisComponent', () => {
  let component: NovoTicketDoisComponent;
  let fixture: ComponentFixture<NovoTicketDoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTicketDoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTicketDoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
