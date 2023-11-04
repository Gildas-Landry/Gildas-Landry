import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  public chart:any;
  constructor() { }

  ngOnInit(): void {
    this.createLineChart();
  }
  createLineChart(){

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2023-05-10', '2023-05-11', '2023-05-12','2023-05-13',
								 '2023-05-14', '2023-05-15', '2023-05-16','2023-05-17', ],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'yellow'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

}
