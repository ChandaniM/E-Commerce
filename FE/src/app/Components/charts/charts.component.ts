import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'charts',
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  @Input() chartConfig: any;

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;
  chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    if (this.chartConfig) {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: this.chartConfig.type,
        data: {
          labels: this.chartConfig.labels,
          datasets: this.chartConfig.datasets
        },
        options: this.chartConfig.options
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
