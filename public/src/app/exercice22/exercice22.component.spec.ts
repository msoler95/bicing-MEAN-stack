import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercice22Component } from './exercice22.component';

describe('Exercice22Component', () => {
  let component: Exercice22Component;
  let fixture: ComponentFixture<Exercice22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercice22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercice22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
