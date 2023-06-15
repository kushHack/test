import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class DashSummaryComponent {

  @Input() title: string = '';
  @Input() summary: any;

  public type1: string = 'Budget';
  public type2: string = 'Forecast';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let forecastType = this.route.snapshot.params['type'];
    // if (forecastType) {
    //   if (forecastType === 'actual-forecast') {
    //     this.type1 = 'Actual';
    //     this.type2 = 'Forecast';
    //   }
    //   if (forecastType === 'actual-budget') {
    //     this.type1 = 'Actual';
    //     this.type2 = 'Budgeted';
    //   }
    //   if (forecastType === 'budget-forecast') {
    //     this.type1 = 'Budgeted';
    //     this.type2 = 'Forecast';
    //   }
    // }
  }

  getNumber(num:any) {
    if (num < 0) {
        num = Math.abs(num)
        return `(${num.toLocaleString("en-US")})`;
    }
    if (num >= 0) {
        return num.toLocaleString("en-US");
    }
}

}
