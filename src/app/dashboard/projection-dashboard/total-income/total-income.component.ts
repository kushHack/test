import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherIncomePreviewKeys, RentalIncomePreviewKeys } from 'src/app/shared/config/fields';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-income',
  templateUrl: './total-income.component.html',
  styleUrls: ['./total-income.component.scss', '../projection-dashboard.component.scss']
})
export class TotalIncomeComponent implements OnInit {
  public heading: string = 'Projection Dashboard : Total Income';
  public dashboardType: string = 'combined';
  public userRole: string = '';
  public userEmail: string = '';
  public index: number = 0;
  public chartData: any;
  public summary: any;
  public fetchDone: boolean = false;
  public type: string = '';
  public chartTitle: string = '';
  public workflows: any[] = [];
  public versions: any[] = [];
  public communities: any[] = [];
  public years: any[] = [];
  public selectedVersion: number = 1.1;
  public selectedYear: number = new Date().getFullYear();

  constructor(private title: Title,
    private router: Router,
    private spinner: SpinnerService,
    private authService: AuthService,
    private workflowService: WorkflowService,
  ) {
    this.title.setTitle('Dashboard: Total Income')
  }

  changeDashboadType(type: string) {
    this.dashboardType = type;
    this.index = 0;
    this.fetchDone = false;
    this.selectedVersion = 1.1;
    this._generateForecast(this.dashboardType, this.selectedVersion);
  }

  changeForecast(event: any) {
    this.index = event.target.value;
    this.fetchDone = false;
    this.selectedVersion = 1.1;
    this._generateForecast(this.dashboardType, this.selectedVersion);
  }

  changeForecastVersion(event: any) {
    this.fetchDone = false;
    this.selectedVersion = event.target.value;
    this._generateForecast(this.dashboardType, this.selectedVersion);
  }

  changeForecastYear(event: any) {
    this.fetchDone = false;
    this.index = 0;
    this.selectedYear = event.target.value;
    this._getCommunities();
  }

  navigate(destination: string) {
    let link = `/dashboard/projection-dashboard/${destination}`
    this.router.navigate([link]);
  }

  ngOnInit() {
    this.spinner.change(false);
    this.userRole = this.authService.getUser('role');
    this.userEmail = this.authService.getUser('email');
    this._getYears();
  }

  _getYears() {
    if (this.userRole === 'RA') {
      this.workflowService.getApprovedYears().subscribe(res => {
        if (res.code === 200) {
          this.years = res.data;
          this.selectedYear = this.years[this.years.length-1];
          this._getCommunities();
        }
      })
    }
    if (this.userRole === 'RPM') {
      this.workflowService.getApprovedYearsByRPM(this.userEmail).subscribe(res => {
        if (res.code === 200) {
          this.years = res.data;
          this.selectedYear = this.years[this.years.length-1];
          this._getCommunities();
        }
      })
    }
  }

  _getCommunities() {
    if (this.userRole === 'RA') {
      this.workflowService.getAllCommunityNames(this.selectedYear).subscribe(res => {
        if (res.code === 200) {
          this.communities = res.data.communities;
          this.years = res.data.years;
          this._generateForecast(this.dashboardType, this.selectedVersion);
        }
      })
    };
    if (this.userRole === 'RPM') {
      this.workflowService.getAllCommunityNamesRPM(this.userEmail, this.selectedYear).subscribe(res => {
        if (res.code === 200) {
          this.communities = res.data.communities;
          this.years = res.data.years;
          this._generateForecast(this.dashboardType, this.selectedVersion);
        }
      })
    }
  }

  _generateForecast(type: string, version: number) {
    if (type === 'combined') {
      this._getWorkflows(version)?.subscribe((res: any) => {
        this.versions = res.data.versions;
        this.workflows = res.data.workflows;
        if (res.code === 200 && this.workflows.length) {
          this._getForecasts(this.workflows)?.subscribe((data2: any) => {
            const { budgets, forecasts, actuals } = data2.data;
            this.chartData = this.generateChartData(budgets, forecasts, actuals);
            this.fetchDone = true;
          });
        };
      });
    }

    if (type === 'individual') {
      this.workflowService.getWorkflowByCommunity(this.communities[this.index].communityId, version)?.subscribe(res => {
        this.versions = res.data.versions;
        this.workflows = res.data.workflows;
        this._getForecasts(this.workflows)?.subscribe((data2: any) => {
          const { budgets, forecasts, actuals } = data2.data;
          this.chartData = this.generateChartData(budgets, forecasts, actuals);
          this.fetchDone = true;
        })
      })
    }
  }

  _getWorkflows(version: number) {
    if (this.userRole === 'RPM') {
      return this.workflowService.getApprovedWorkflowRPM(this.userEmail, version, this.selectedYear);
    }
    if (this.userRole === 'RA') {
      return this.workflowService.getApprovedWorkflow(version, this.selectedYear);
    }
    return;
  }

  _getForecasts(workflows: any) {
    return this.workflowService.getBudgetAndForecastSheets(workflows, this.selectedYear);
  }

  public netRentKey = RentalIncomePreviewKeys;
  public totalIncomeKey = OtherIncomePreviewKeys;
  generateChartData(budgets: any, forecasts: any, actuals: any) {
    let netRent: any = this.generateNullObject(this.netRentKey);
    let totalIncome: any = this.generateNullObject(this.totalIncomeKey);
    budgets.forEach((budget: any) => {
      netRent = this.assignNetRentData('budget', netRent, budget);
      totalIncome = this.assignTotalIncomeData('budget', totalIncome, budget);
    })
    forecasts.forEach((forecast: any) => {
      netRent = this.assignNetRentData('forecast', netRent, forecast);
      totalIncome = this.assignTotalIncomeData('forecast', totalIncome, forecast);
    })
    actuals.forEach((actual: any) => {
      netRent = this.assignNetRentData('actual', netRent, actual);
      totalIncome = this.assignTotalIncomeData('actual', totalIncome, actual);
    })
    return { netRent, totalIncome };
  }

  assignNetRentData(type: string, netRentData: any, data: any) {
    let netRent: any = netRentData;

    this.netRentKey.forEach((key: any) => {
      if (key.control != 'grossPotentialRent' && key.control != 'gainLossMarket') {
        netRent[type][key.control] += data.rentalIncome[key.control];
      }
    })
    // netRent[type].gpr += data.rentalIncome.grossPotentialRent.total + data.rentalIncome.gainLossMarket.total;
    return netRent;
  }

  assignTotalIncomeData(type: string, totalIncomeData: any, data: any) {
    let totalIncome: any = totalIncomeData;
    this.totalIncomeKey.forEach((key: any) => {
      totalIncome[type][key.control] += data.otherIncome[key.control];
    })
    return totalIncome;
  }

  generateNullObject(keys: any) {
    let budget: any = {}, forecast: any = {}, actual: any = {};
    keys.forEach((key: any) => {
      budget[key.control] = 0;
      forecast[key.control] = 0;
      actual[key.control] = 0;
    })
    return { budget, forecast, actual };
  }

  // generateChartData(budgets: any, forecasts: any, actuals: any) {
  //   let set1: any[] = [], set2: any[] = [];
  //   if (this.type === 'actual-forecast') {
  //     this.chartTitle = 'Actual vs Forecast: ';
  //     set1 = actuals;
  //     set2 = forecasts;
  //   }
  //   if (this.type === 'budget-forecast') {
  //     this.chartTitle = 'Budget vs Forecast: ';
  //     set1 = budgets;
  //     set2 = forecasts;
  //   }
  //   if (this.type === 'actual-budget') {
  //     this.chartTitle = 'Actual vs Budget: ';
  //     set1 = actuals;
  //     set2 = budgets;
  //   }
  //   let rentalIncome: any = this.generateMonthNullObject(),
  //     otherIncome: any = this.generateMonthNullObject(),
  //     totalIncome: any = this.generateMonthNullObject();
  //   let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  //   months.forEach((month: string) => {
  //     set1.forEach((el: any) => {
  //       rentalIncome.budget[month] += el.rentalIncome.totalMonthData.monthData[month];
  //       otherIncome.budget[month] += el.otherIncome.totalMonthData.monthData[month];
  //       totalIncome.budget[month] += el.totalIncome.monthData[month];
  //     })
  //     set2.forEach((el: any) => {
  //       rentalIncome.forecast[month] += el.rentalIncome.totalMonthData.monthData[month];
  //       otherIncome.forecast[month] += el.otherIncome.totalMonthData.monthData[month];
  //       totalIncome.forecast[month] += el.totalIncome.monthData[month];
  //     })
  //   })
  //   return { otherIncome, rentalIncome, totalIncome };
  // }

  // generateMonthNullObject() {
  //   let budget = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };
  //   let forecast = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };
  //   return { budget, forecast }
  // }
}
