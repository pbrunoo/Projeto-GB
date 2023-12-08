import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyFourComponent } from './new-company-three.component';

describe('NewCompanyFourComponent', () => {
  let component: NewCompanyFourComponent;
  let fixture: ComponentFixture<NewCompanyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
