import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';

@Component({
  selector: 'app-exercice22',
  templateUrl: './exercice22.component.html',
  styleUrls: ['./exercice22.component.css']
})
export class Exercice22Component implements OnInit {

  displayedColumns: string[] = ['distancia', 'disponibles', 'id', 'name', 'location'];
  stations: any[];
  lat: number;
  lng: number;
  constructor(private stationsService: StationsService) { }

  ngOnInit() {
  }


  search(): void {
    var url = '?'
    if (this.lat && this.lng) {
      url += ("&loc=" + this.lat + ',' + this.lng + ',5')
    }
    console.log(url)
    console.log(this.stations)
    this.stationsService.getNearestStationWithFreeBikes(url)
      .subscribe(station => this.stations = [station])
  }

}
