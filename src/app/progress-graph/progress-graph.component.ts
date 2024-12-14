import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import  Chart  from 'chart.js/auto';
import {ProfileComponent} from '../profile/profile.component';

@Component({
  selector: 'app-progress-graph',
  templateUrl: './progress-graph.component.html',
  styleUrls: ['./progress-graph.component.css'],
  imports: [],
  standalone: true
})
export class ProgressGraphComponent implements OnInit {
  @ViewChild('myChart', { static: true }) chartRef!: ElementRef<HTMLCanvasElement>;
  myChart!: Chart;

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    const data = [10, 20, 15, 30, 25]; // Valori iniziali

    this.myChart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio'],
        datasets: [{
          label: 'Livello di gioco',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Esempio: aggiorna il grafico dopo 2 secondi
    setTimeout(() => this.aggiornaGrafico([15, 25, 20, 35, 30]), 2000);
  }

  aggiornaGrafico(valori: number[]): void {
    this.myChart.data.datasets[0].data = valori;
    this.myChart.update();
  }
}
