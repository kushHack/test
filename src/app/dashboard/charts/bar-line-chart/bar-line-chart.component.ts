import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { BarLineChartOptions, ColorSet } from './bar-line.options';

@Component({
  selector: 'app-bar-line-chart',
  templateUrl: './bar-line-chart.component.html',
  styleUrls: ['./bar-line-chart.component.scss']
})
export class BarLineChartComponent {

  @Input() chartData: any;
  @Input() title: any;
  @Input() chartId: any;
  @Input() setIndex: number = 0;

  constructor(private route: ActivatedRoute) { }

  public option: any = BarLineChartOptions;
  public reqData: any = {};
  public colorSet = ColorSet;
  public type = '';

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
    this.reqData = this.transformData(this.chartData);
  }

  transformData(data: any) {
    let set1: number[] = Object.values(data.budget);
    let set2: number[] = Object.values(data.forecast);
    let variance: any[] = set1.map((element: any, index: number) => {
      let calc;
      if (element != 0) {
        calc = ((set2[index] - element) / element) * 100;
      }
      else {
        calc = 0;
      }
      return calc.toFixed(2);
    });
    return { set1, set2, variance };

  }

  ngAfterViewInit(): void {
    let chartDom = document.getElementById(this.chartId)!;
    let myChart = echarts.init(chartDom);
    this.option.title.text = this.title;
    this.option.series[0].data = this.reqData.set1;
    this.option.series[1].data = this.reqData.set2;
    this.option.series[2].data = this.reqData.variance;

    if (this.type === 'actual-forecast') {
      this.option.legend.data = ['Actual', 'Forecast', 'Variance'];
      this.option.series[0].name = 'Actual';
      this.option.series[1].name = 'Forecast';
    }
    if (this.type === 'actual-budget') {
      this.option.legend.data = ['Actual', 'Budgeted', 'Variance'];
      this.option.series[0].name = 'Actual';
      this.option.series[1].name = 'Budgeted';
    }
    if (this.type === 'budget-forecast') {
      this.option.legend.data = ['Budgeted', 'Forecast', 'Variance'];
      this.option.series[0].name = 'Budgeted';
      this.option.series[1].name = 'Forecast';
    }

    this.option.series[0].color = this.colorSet[this.setIndex].set1;
    this.option.series[1].color = this.colorSet[this.setIndex].set2;
    this.option.series[2].color = this.colorSet[this.setIndex].variance;
    this.option.yAxis[1].axisLine.lineStyle.color = this.colorSet[this.setIndex].variance;
    this.option && myChart.setOption(this.option);

  }

}
