import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyTwoComponent } from './new-company-two.component';

describe('NewCompanyTwoComponent', () => {
  let component: NewCompanyTwoComponent;
  let fixture: ComponentFixture<NewCompanyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
