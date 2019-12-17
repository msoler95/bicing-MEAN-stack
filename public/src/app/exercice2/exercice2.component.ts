import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import * as moment from 'moment';
@Component({
  selector: 'app-exercice2',
  templateUrl: './exercice2.component.html',
  styleUrls: ['./exercice2.component.css']
})
export class Exercice2Component implements OnInit {
  stations: any[];
  displayedColumns: string[] = ['id', 'name', 'location', 'horas'];
  valuePickerFromMoment: any;
  valuePickerToMoment: any;
  lat: number;
  lng: number;
  radius: number = 1;
  idStation: number;
  constructor(private stationsService: StationsService) { }

  ngOnInit() {
    this.getStations();

  }

  formatDateFrom(valuePickerFrom): void {
    console.log('hola')
    this.valuePickerFromMoment = moment(valuePickerFrom, "hh:mm").format("YYYY-MM-DDTHH:mm:ss");
    console.log(this.valuePickerFromMoment)
  }

  formatDateTo(valuePickerTo): void {
    console.log('hola')
    this.valuePickerToMoment = moment(valuePickerTo, "hh:mm").format("YYYY-MM-DDTHH:mm:ss");
    console.log(this.valuePickerToMoment)
  }

  displayTimeFrom(pickerFrom): void {
    console.log(pickerFrom)
    console.log("hola")
  }
  getStations(): void {
    this.stationsService.getStations()
      .subscribe(stations => this.stations = stations)
  }

  search(): void {
    var url = '?'
    if (this.valuePickerFromMoment) {
      url += ("&timeFrom=" + this.valuePickerFromMoment)
    }
    if (this.valuePickerToMoment) {
      url += ("&timeEnd=" + this.valuePickerToMoment)
    }
    if (this.lat && this.lng && this.radius) {
      url += ("&loc=" + this.lat + ',' + this.lng + ',' + this.radius)
    }
    if (this.idStation) {
      url += ("&id=" + this.idStation)
    }

    console.log(url)
    this.stationsService.getStationsByParams(url)
      .subscribe(stations => this.stations = stations)
  }

}
