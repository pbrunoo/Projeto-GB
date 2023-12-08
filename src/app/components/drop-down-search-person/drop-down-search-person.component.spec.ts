import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownSearchPersonComponent } from './drop-down-search-person.component';

describe('DropDownSearchPersonComponent', () => {
  let component: DropDownSearchPersonComponent;
  let fixture: ComponentFixture<DropDownSearchPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownSearchPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownSearchPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
