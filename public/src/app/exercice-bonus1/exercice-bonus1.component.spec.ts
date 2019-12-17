import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceBonus1Component } from './exercice-bonus1.component';

describe('ExerciceBonus1Component', () => {
  let component: ExerciceBonus1Component;
  let fixture: ComponentFixture<ExerciceBonus1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciceBonus1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciceBonus1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
