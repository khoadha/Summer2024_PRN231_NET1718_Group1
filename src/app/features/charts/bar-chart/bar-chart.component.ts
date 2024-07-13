import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { Component, Input, OnInit } from '@angular/core';
import { OrderCountStatistic } from 'src/app/core/models/statistic';
echarts.use([LineChart, CanvasRenderer]);
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() data!: OrderCountStatistic;
  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.chartOptions = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Trạng thái',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.data.processingCount, name: 'In Rent' },
            { value: this.data.completedCount, name: 'Available' },
            { value: this.data.confirmedCount, name: 'Canceled' },
            { value: this.data.canceledCount, name: 'abcxyz' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
}
