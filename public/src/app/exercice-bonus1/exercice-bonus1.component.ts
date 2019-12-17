import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercice-bonus1',
  templateUrl: './exercice-bonus1.component.html',
  styleUrls: ['./exercice-bonus1.component.css']
})
export class ExerciceBonus1Component implements OnInit {

  constructor() { }
  bici: number;
  bicis: number[];
  vecesLibres: number;

  ngOnInit() {
    this.bicis = new Array<number>(30).fill(0)
  }

  add(x): void {
    this.bicis[x] += 1
    this.bicis = this.bicis.concat([])
  }
  vecesBicisLibresMenorQue(x): void {
    this.vecesLibres = 0;
    for (var i = 0; i < x; ++i) {
      this.vecesLibres += this.bicis[i];
    }

  }

}
