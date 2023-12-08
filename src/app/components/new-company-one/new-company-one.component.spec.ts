import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyOneComponent } from './new-company-one.component';

describe('CompanyComponent', () => {
  let component: NewCompanyOneComponent;
  let fixture: ComponentFixture<NewCompanyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
