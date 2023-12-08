import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalTransferComponent } from './modal-transfer.component';

describe('ModalTransferComponent', () => {
  let component: ModalTransferComponent;
  let fixture: ComponentFixture<ModalTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
