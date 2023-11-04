import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  public chart:any;
  constructor() { }
  createBarChart(){

    this.chart = new Chart("MyBarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2023-05-10', '2023-05-11', '2023-05-12','2023-05-13',
								 '2023-05-14', '2023-05-15', ],
	       datasets: [

          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'blue',

          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  ngOnInit(): void {
    this.createBarChart();
  }

}
