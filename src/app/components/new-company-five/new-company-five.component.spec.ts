import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyFiveComponent } from './new-company-five.component';

describe('NewCompanyFiveComponent', () => {
  let component: NewCompanyFiveComponent;
  let fixture: ComponentFixture<NewCompanyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
