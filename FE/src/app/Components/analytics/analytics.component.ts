import { Component } from '@angular/core';
import { ChartsComponent } from '../charts/charts.component';
import { Tooltip } from 'chart.js';

@Component({
  selector: 'analytics',
  imports: [ChartsComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  chartJson : any = {
    width:"200px",
    height:"200px",
    id : "barChart",
    chartId: 'salesChart',
    type: 'bar',
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 190, 300, 170],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ],
    options: {
      responsive: true,
      scales: {
        x: {
        title: {
          display: true,
          text: "Months" 
        }
      }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
     }
  };
}
