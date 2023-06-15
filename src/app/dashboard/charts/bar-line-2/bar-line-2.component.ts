import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import { BarLineChartOptions, ColorSet } from './bar-line-2.options';

@Component({
  selector: 'app-bar-line-2',
  templateUrl: './bar-line-2.component.html',
  styleUrls: ['./bar-line-2.component.scss']
})
export class BarLineTwoChartComponent {

  @Input() chartData: any;
  @Input() title: any;
  @Input() chartId: any;
  @Input() row: string[] = [];
  @Input() setIndex: number = 0;

  @Output() data_output = new EventEmitter();

  constructor(private route: ActivatedRoute) { }

  public option: any = BarLineChartOptions;
  public reqData: any = {};
  public colorSet = ColorSet;
  public type = '';
  public minValue: number = 0;
  public maxValue: number = 0;

  ngOnInit() {
    this.reqData = this.transformData(this.chartData);
    this.getMinMaxValue();
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

  getMinMaxValue() {
    let min_set1 = Math.min(...this.reqData.set1);
    let min_set2 = Math.min(...this.reqData.set2);
    let max_set1 = Math.max(...this.reqData.set1);
    let max_set2 = Math.max(...this.reqData.set2);
    if (min_set1 > min_set2) this.minValue = min_set2;
    if (min_set1 <= min_set2) this.minValue = min_set1;
    if (min_set1 > min_set2) this.maxValue = max_set1;
    if (min_set1 <= min_set2) this.maxValue = max_set2;
  }

  ngAfterViewInit(): void {
    let chartDom = document.getElementById(this.chartId)!;
    let myChart = echarts.init(chartDom);
    this.option.title.text = this.title;
    this.option.series[0].data = this.reqData.set1;
    this.option.series[1].data = this.reqData.set2;
    this.option.series[2].data = this.reqData.variance;
    if (this.row.length) {
      this.option.xAxis[0].data = this.row;
    }
    this.option.series[0].color = this.colorSet[this.setIndex].set1;
    this.option.series[1].color = this.colorSet[this.setIndex].set2;
    this.option.series[2].color = this.colorSet[this.setIndex].variance;
    this.option.yAxis[1].axisLine.lineStyle.color = this.colorSet[this.setIndex].variance;
    this.option && myChart.setOption(this.option);

    myChart.getZr().on('click', params => {
      let pointInPixel = [params.offsetX, params.offsetY];
      let pointInGrid = myChart.convertFromPixel('grid', pointInPixel);
      if (pointInGrid[0] >= 0 && pointInGrid[0] < this.row.length && pointInGrid[1] >= this.minValue && pointInGrid[1] <= this.maxValue) {
        this.data_output.emit(`${pointInGrid[0]}`);
      }
    });

  }

}
