import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHeaderIntoComponent } from './global-header-into.component';

describe('GlobalHeaderIntoComponent', () => {
  let component: GlobalHeaderIntoComponent;
  let fixture: ComponentFixture<GlobalHeaderIntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalHeaderIntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHeaderIntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
