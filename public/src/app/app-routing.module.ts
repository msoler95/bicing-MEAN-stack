import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Exercice1Component } from './exercice1/exercice1.component';
import { Exercice2Component } from './exercice2/exercice2.component';
import { Exercice22Component } from './exercice22/exercice22.component';
import { DisponibilityComponent } from './shared/disponibility/disponibility.component';
import { ExerciceBonus1Component } from './exercice-bonus1/exercice-bonus1.component';
import { ExerciceBonus2Component } from './exercice-bonus2/exercice-bonus2.component';

const routes: Routes = [
  { path: '', redirectTo: '/exercice1', pathMatch: 'full' },
  { path: 'exercice1', component: Exercice1Component },
  { path: 'exercice2', component: Exercice2Component },
  { path: 'exercice2-2', component: Exercice22Component },
  { path: 'station/:id', component: DisponibilityComponent },
  { path: 'bonus1', component: ExerciceBonus1Component },
  { path: 'bonus2', component: ExerciceBonus2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
