import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownTeamComponent } from './drop-down-team.component';

describe('DropDownTeamComponent', () => {
  let component: DropDownTeamComponent;
  let fixture: ComponentFixture<DropDownTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
