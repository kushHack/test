import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss', '../projection-dashboard.component.scss']
})
export class RentalIncomeComponent implements OnInit {

  public heading: string = 'Projection Dashboard : Rental Income';
  public dashboardType: string = 'combined';
  public userRole: string = '';
  public userEmail: string = '';
  public index: number = 0;
  public defaultVersion: number = 1.1;
  public chartData: any;
  public summary: any;
  public fetchDone: boolean = false;
  public chartTitle = '';
  public type = '';
  public workflows: any[] = [];
  public versions: any[] = [];
  public communities: any[] = [];
  public selectedVersion: number = this.defaultVersion;
  public years: any[] = [];
  public selectedYear: number = new Date().getFullYear();

  constructor(private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private authService: AuthService,
    private workflowService: WorkflowService,
  ) {
    this.title.setTitle('Dashboard: Rental Income')
  }

  changeDashboadType(type: string) {
    this.dashboardType = type;
    this.index = 0;
    this.fetchDone = false;
    this.selectedVersion = this.defaultVersion;
    this._generateForecast(this.dashboardType, this.selectedVersion);
  }

  changeForecast(event: any) {
    this.index = event.target.value;
    this.fetchDone = false;
    this.selectedVersion = this.defaultVersion;
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
    this.type = this.route.snapshot.params['type'];
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
            const { foreacts, forecasts } = data2.data;
            this.chartData = this.generateChartData(foreacts, forecasts);
            this.summary = this.calcSummary(this.chartData.totalRentalIncome);
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
          const { foreacts, forecasts } = data2.data;
          this.chartData = this.generateChartData(foreacts, forecasts);
          this.summary = this.calcSummary(this.chartData.totalRentalIncome);
          this.fetchDone = true;
        })
      })
    }
  }

  calcSummary(totalRentalIncome: any) {
    let budgeted: any = Object.values(totalRentalIncome.budget);
    let forecasted: any = Object.values(totalRentalIncome.forecast);
    let budget = 0, forecast = 0;
    for (let i = 0; i < budgeted.length; i++) {
      budget += budgeted[i];
      forecast += forecasted[i];
    }
    let variance = forecast - budget;
    let change = (variance / budget) * 100;
    return { budget, forecast, variance, change: change.toFixed(2) };
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
    return this.workflowService.getForeact_ForecastSheet(workflows, this.selectedYear);
  }

  generateChartData(budgets: any, forecasts: any) {
    let set1: any[] = [], set2: any[] = [];
    set1 = budgets;
    set2 = forecasts;
    let grossPotentialRent: any = this.generateMonthNullObject(),
      gainLossMarket: any = this.generateMonthNullObject(),
      vacancy: any = this.generateMonthNullObject(),
      adminUnits: any = this.generateMonthNullObject(),
      mgrConcessions: any = this.generateMonthNullObject(),
      badDebtWO: any = this.generateMonthNullObject(),
      badDebtRentWO: any = this.generateMonthNullObject(),
      totalRentalIncome: any = this.generateMonthNullObject();
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    months.forEach((month: string) => {
      set1.forEach((el: any) => {
        grossPotentialRent.budget[month] += el.rentalIncome.grossPotentialRent.monthData[month];
        gainLossMarket.budget[month] += el.rentalIncome.gainLossMarket.monthData[month];
        vacancy.budget[month] += el.rentalIncome.vacancy.monthData[month];
        adminUnits.budget[month] += el.rentalIncome.adminUnits.monthData[month];
        mgrConcessions.budget[month] += el.rentalIncome.mgrConcessions.monthData[month];
        badDebtWO.budget[month] += el.rentalIncome.badDebtWO.monthData[month];
        badDebtRentWO.budget[month] += el.rentalIncome.badDebtRentWO.monthData[month];
        totalRentalIncome.budget[month] += el.rentalIncome.totalMonthData.monthData[month];
      })
      set2.forEach((el: any) => {
        grossPotentialRent.forecast[month] += el.rentalIncome.grossPotentialRent.monthData[month];
        gainLossMarket.forecast[month] += el.rentalIncome.gainLossMarket.monthData[month];
        vacancy.forecast[month] += el.rentalIncome.vacancy.monthData[month];
        adminUnits.forecast[month] += el.rentalIncome.adminUnits.monthData[month];
        mgrConcessions.forecast[month] += el.rentalIncome.mgrConcessions.monthData[month];
        badDebtWO.forecast[month] += el.rentalIncome.badDebtWO.monthData[month];
        badDebtRentWO.forecast[month] += el.rentalIncome.badDebtRentWO.monthData[month];
        totalRentalIncome.forecast[month] += el.rentalIncome.totalMonthData.monthData[month];
      })
    })
    return { gainLossMarket, grossPotentialRent, vacancy, adminUnits, mgrConcessions, badDebtRentWO, badDebtWO, totalRentalIncome };
  }

  generateMonthNullObject() {
    let budget = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };
    let forecast = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };
    return { budget, forecast }
  }

}
