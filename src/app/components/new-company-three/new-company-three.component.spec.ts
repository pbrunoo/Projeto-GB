import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyThreeComponent } from './new-company-three.component';

describe('NewCompanyThreeComponent', () => {
  let component: NewCompanyThreeComponent;
  let fixture: ComponentFixture<NewCompanyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
