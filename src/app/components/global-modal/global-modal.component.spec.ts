import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGlobalComponent } from './global-modal.component';

describe('ModalDeleteComponent', () => {
  let component: ModalGlobalComponent;
  let fixture: ComponentFixture<ModalGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
