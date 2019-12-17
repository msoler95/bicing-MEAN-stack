import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Exercice1Component } from './exercice1/exercice1.component';
import { Exercice2Component } from './exercice2/exercice2.component';
import { Exercice22Component } from './exercice22/exercice22.component';
import { DisponibilityComponent } from './shared/disponibility/disponibility.component';

const routes: Routes = [
  { path: '', redirectTo: '/exercice1', pathMatch: 'full' },
  { path: 'exercice1', component: Exercice1Component },
  { path: 'exercice2', component: Exercice2Component },
  { path: 'exercice2-2', component: Exercice22Component },
  { path: 'station/:id', component: DisponibilityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
