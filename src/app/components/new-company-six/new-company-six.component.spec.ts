import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanySixComponent } from './new-company-six.component';

describe('NewCompanyFiveComponent', () => {
  let component: NewCompanySixComponent;
  let fixture: ComponentFixture<NewCompanySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanySixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
