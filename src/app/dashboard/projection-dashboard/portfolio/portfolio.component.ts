import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss', '../projection-dashboard.component.scss']
})
export class PortfolioComponent implements OnInit {
  public heading: string = 'Projection Dashboard : Portfolio';
  public dashboardType: string = 'combined';
  public userRole: string = '';
  public userEmail: string = '';
  public index: number = 0;
  public chartData: any;
  public summary: any;
  public fetchDone: boolean = false;
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
    this.title.setTitle('Dashboard: Portfolio')
  }

  changeDashboadType(type: string) {
    this.dashboardType = type;
    this.index = 0;
    this.fetchDone = false;
    this.selectedVersion = 1.1;
    this._generateForecast(this.dashboardType, this.selectedVersion);
  }

  changeForecastCommunity(event: any) {
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
          this._generateForecast(this.dashboardType, this.selectedVersion);
        }
      })
    };
    if (this.userRole === 'RPM') {
      this.workflowService.getAllCommunityNamesRPM(this.userEmail, this.selectedYear).subscribe(res => {
        if (res.code === 200) {
          this.communities = res.data.communities;
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

  generateChartData(budgets: any, forecasts: any, actuals: any) {
    let revenue: any = {}, expense: any = {};
    revenue.budget = { gpr: 0, netRent: 0, otherIncome: 0 };
    revenue.forecast = { gpr: 0, netRent: 0, otherIncome: 0 };
    revenue.actual = { gpr: 0, netRent: 0, otherIncome: 0 };
    expense.budget = { mr: 0, rm: 0 };
    expense.forecast = { mr: 0, rm: 0 };
    expense.actual = { mr: 0, rm: 0 };
    budgets.forEach((budget: any) => {
      revenue.budget.gpr += budget.rentalIncome.grossPotentialRent + budget.rentalIncome.gainLossMarket;
      revenue.budget.netRent += budget.rentalIncome.total;
      revenue.budget.otherIncome += budget.otherIncome.total;
      expense.budget.mr += budget.makeReadyExpense.total
      expense.budget.rm += budget.repairAndMaintenance.total
    })
    forecasts.forEach((forecast: any) => {
      revenue.forecast.gpr += forecast.rentalIncome.grossPotentialRent + forecast.rentalIncome.gainLossMarket;
      revenue.forecast.netRent += forecast.rentalIncome.total;
      revenue.forecast.otherIncome += forecast.otherIncome.total;
      expense.forecast.mr += forecast.makeReadyExpense.total
      expense.forecast.rm += forecast.repairAndMaintenance.total
    })
    actuals.forEach((actual: any) => {
      revenue.actual.gpr += actual.rentalIncome.grossPotentialRent + actual.rentalIncome.gainLossMarket;
      revenue.actual.netRent += actual.rentalIncome.total;
      revenue.actual.otherIncome += actual.otherIncome.total;
      expense.actual.mr += actual.makeReadyExpense.total
      expense.actual.rm += actual.repairAndMaintenance.total
    })
    return { revenue, expense };
  }
}
