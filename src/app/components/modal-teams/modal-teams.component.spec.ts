import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTeamsComponent } from './modal-teams.component';

describe('ModalRegisterCompanyComponent', () => {
  let component: ModalTeamsComponent;
  let fixture: ComponentFixture<ModalTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
