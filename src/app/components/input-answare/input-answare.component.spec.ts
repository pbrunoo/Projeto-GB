import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAnswareComponent } from './input-answare.component';

describe('InputAnswareComponent', () => {
  let component: InputAnswareComponent;
  let fixture: ComponentFixture<InputAnswareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAnswareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAnswareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
