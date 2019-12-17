import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceBonus2Component } from './exercice-bonus2.component';

describe('ExerciceBonus2Component', () => {
  let component: ExerciceBonus2Component;
  let fixture: ComponentFixture<ExerciceBonus2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciceBonus2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciceBonus2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
