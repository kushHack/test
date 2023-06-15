import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MakeReadyPreviewKeys, ReparMaintenancePreviewKeys } from 'src/app/shared/config/fields';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-income',
  templateUrl: './total-expense.component.html',
  styleUrls: ['./total-expense.component.scss', '../projection-dashboard.component.scss']
})
export class TotalExpenseComponent implements OnInit {
  public heading: string = 'Projection Dashboard : Total Expense';
  public dashboardType: string = 'combined';
  public userRole: string = '';
  public userEmail: string = '';
  public index: number = 0;
  public chartData: any;
  public summary: any;
  public fetchDone: boolean = false;
  public chartTitle = '';
  public type = '';
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
    this.title.setTitle('Dashboard: Total Expense')
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

  public mrKeys = MakeReadyPreviewKeys;
  public rmKeys = ReparMaintenancePreviewKeys;

  generateChartData(budgets: any, forecasts: any, actuals: any) {
    let mrExpense: any = this.generateNullObject(this.mrKeys);
    let rmExpense: any = this.generateNullObject(this.rmKeys);
    budgets.forEach((budget: any) => {
      mrExpense = this.assignMrData('budget', mrExpense, budget);
      rmExpense = this.assignRmData('budget', rmExpense, budget);
    })
    forecasts.forEach((forecast: any) => {
      mrExpense = this.assignMrData('forecast', mrExpense, forecast);
      rmExpense = this.assignRmData('forecast', rmExpense, forecast);
    })
    actuals.forEach((actual: any) => {
      mrExpense = this.assignMrData('actual', mrExpense, actual);
      rmExpense = this.assignRmData('actual', rmExpense, actual);
    })
    return { mrExpense, rmExpense };
  }

  assignMrData(type: string, mrExpenseData: any, data: any) {
    let totalMR: any = mrExpenseData;
    this.mrKeys.forEach((key: any) => {
      totalMR[type][key.control] += data.makeReadyExpense[key.control];
    })
    return totalMR;
  }

  assignRmData(type: string, rmExpenseData: any, data: any) {
    let totalRM: any = rmExpenseData;
    this.rmKeys.forEach((key: any) => {
      totalRM[type][key.control] += data.repairAndMaintenance[key.control];
    })
    return totalRM;
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
}
