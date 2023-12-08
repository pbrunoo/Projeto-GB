import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotsGreetingsComponent } from './bots-greetings.component';

describe('BotsGreetingsComponent', () => {
  let component: BotsGreetingsComponent;
  let fixture: ComponentFixture<BotsGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotsGreetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotsGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
