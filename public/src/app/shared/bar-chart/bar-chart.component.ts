import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {


  @Input() free: number[];
  @Input() bikes: number[];
  @Input() time: any[];
  init: boolean = false;

  pepe: any[];
  loko: any[];
  constructor() { }

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend;
  public barChartPlugins;

  public barChartData: ChartDataSets[];

  ngOnInit() {
    console.log(this.time)
    this.init = true;
    this.barChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    this.barChartLabels = this.time;
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [pluginDataLabels];

    this.barChartData = [
      { data: this.bikes, label: 'Not avaliable', borderColor: 'red' },
      { data: this.free, label: 'Avaliable', borderColor: 'green' }
    ];
  }





  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
