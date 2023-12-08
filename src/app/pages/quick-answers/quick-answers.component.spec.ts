import { QuickAnswersComponent } from './quick-answers.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuickAnswersComponent', () => {
  let component: QuickAnswersComponent;
  let fixture: ComponentFixture<QuickAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
