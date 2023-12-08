import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTicketQuatroComponent } from './novo-ticket-quatro.component';

describe('NovoTicketDoisComponent', () => {
  let component: NovoTicketQuatroComponent;
  let fixture: ComponentFixture<NovoTicketQuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoTicketQuatroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTicketQuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
