import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service'



@Component({
  selector: 'app-exercice1',
  templateUrl: './exercice1.component.html',
  styleUrls: ['./exercice1.component.css']
})
export class Exercice1Component implements OnInit {

  stations: any[];
  displayedColumns: string[] = ['name'];

  constructor(private stationsService: StationsService) { }

  ngOnInit() {
    this.getStations();
  }

  getStations(): void {
    this.stationsService.allStationsWithoutTime()
      .subscribe(stations => this.stations = stations)
  }


}
