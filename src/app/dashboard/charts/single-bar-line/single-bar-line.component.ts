import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { SingleBarLineChartOptions, ColorSet } from './single-bar-line';

@Component({
  selector: 'app-single-bar-line',
  templateUrl: './single-bar-line.component.html',
  styleUrls: ['./single-bar-line.component.scss']
})
export class SingleBarLineComponent {

  @Input() chartData: any;
  @Input() title: any;
  @Input() chartId: any;
  @Input() setIndex: number = 0;
  @Input() dataSet: number = 0;

  constructor(private router: Router) { }

  public option: any = SingleBarLineChartOptions;
  public reqData: any = {};
  public colorSet = ColorSet;
  // public dataRow: any[] = [['Gross Possible Rent','Net Rent Collected','Other Income'],['Make Ready','Repair and Maintenance']]
  public dataRow: any[] = [
    ['GPR', 'Rent Collected', 'Other Income'],
    ['Make Ready', 'R&M'],
    ['Vacancy', 'Mgr Concessions', 'Admin Units', 'Bad Debt W/O', 'Bad Debt Rent W/O'],
    ['Admin Fee',
      'App Fee',
      'Edge Fee',
      'Electricity',
      'Renters Insurance',
      'Compilance Tracking',
      'Pest Control',
      'Late Charges',
      'NSF Charges',
      'Lease Termination',
      'Smart Rent',
      'Security Deposit',
      'Storage Income',
      'Resident Fee',
    ],
    ['Carpet/Floors', 'Cleaning-General', 'Contract Painting'],
    ['Appliances',
      'GarageCarport',
      'Cleaning Supplies',
      'CommonArea',
      'Electrical',
      'Elevator Repair',
      'Equipment Maint',
      'Exterminating',
      'Fire Equipment',
      'Fitness Center',
      'HVAC Repair',
      'Lights Lamps',
      'Painting Interior',
      'Parking Lot',
      'Plumbing',
      'Pool Jacuzzi',
      'Fire Sprinkler',
      'Tools Equipment',
      'Uniform Other',
      'Window Screen',],
  ];

  ngOnInit() {
    this.reqData = this.transformData(this.chartData);
  }

  transformData(data: any) {
    let set1: number[] = Object.values(data.set1);
    let set2: number[] = Object.values(data.set2);
    let variance: any[] = [];
    let change: any[] = [];
    set1.forEach((val: number, index: number) => {
      let calc = set2[index] - val
      if (calc === 0) {
        variance[index] = 0;
        change[index] = 0;
      }
      if (calc != 0) {
        variance[index] = calc;
        if (set2[index] != 0) {
          let changeCalc = (calc / set2[index]) * 100;
          change[index] = changeCalc.toFixed(2);
        }
        if (set2[index] === 0) {
          change[index] = 0;
        }
      }
    })
    return { variance, change };
  }

  ngAfterViewInit(): void {
    let chartDom = document.getElementById(this.chartId)!;
    let myChart = echarts.init(chartDom);
    this.option.title.text = this.title;
    this.option.xAxis[0].data = this.dataRow[this.dataSet]
    this.option.series[0].data = this.reqData.variance;
    this.option.series[1].data = this.reqData.change;

    this.option.series[0].color = this.colorSet[this.setIndex].bar;
    this.option.series[1].color = this.colorSet[this.setIndex].line;
    this.option.yAxis[1].axisLine.lineStyle.color = this.colorSet[this.setIndex].line;
    this.option && myChart.setOption(this.option);

  }

}
