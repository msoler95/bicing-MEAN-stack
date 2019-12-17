import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StationsService } from 'src/app/stations.service';
@Component({
  selector: 'app-disponibility',
  templateUrl: './disponibility.component.html',
  styleUrls: ['./disponibility.component.css']
})
export class DisponibilityComponent implements OnInit {

  private timeInformation: any;

  constructor(private location: Location, private stationsService: StationsService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.getStationTimeInformation(id)
  }

  getStationTimeInformation(id): void {
    this.stationsService.getStationTimeInformation(id)
      .subscribe(timeInformation => this.timeInformation = timeInformation)
  }

  goBack(): void {
    this.location.back();
  }

}
