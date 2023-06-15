import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ReparMaintenancePreviewKeys } from 'src/app/shared/config/fields';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-rm',
  templateUrl: './RM.component.html',
  styleUrls: ['./RM.component.scss', '../projection-dashboard.component.scss']
})
export class RMComponent implements OnInit {

  public heading: string = 'Projection Dashboard : Repair and Maintenance';
  public dashboardType: string = 'combined';
  public userRole: string = '';
  public userEmail: string = '';
  public index: number = 0;
  public defaultVersion: number = 1.1;
  public chartData: any;
  public summary: any;
  public fetchDone: boolean = false;
  public type = '';
  public chartTitle = '';
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
    this.title.setTitle('Dashboard: R/M')
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
            this.summary = this.calcSummary(this.chartData.totalRM);
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
          this.summary = this.calcSummary(this.chartData.totalRM);
          this.fetchDone = true;
        })
      })
    }
  }

  calcSummary(totalRM: any) {
    let budgeted: any = Object.values(totalRM.budget);
    let forecasted: any = Object.values(totalRM.forecast);
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
    set1 = cloneDeep(budgets);
    set2 = cloneDeep(forecasts);
    let rmObj = this.generateMonthNullObject();
    const keys = ReparMaintenancePreviewKeys;
    let totalRM: any = this.generateMonthNullObj();
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    months.forEach((month: string) => {
      keys.forEach((key: any) => {
        set1.forEach((el: any) => {
          rmObj[key.control].budget[month] += el.repairAndMaintenance[key.control].monthData[month];
          totalRM.budget[month] += el.repairAndMaintenance.totalMonthData.monthData[month];
        })
        set2.forEach((el: any) => {
          rmObj[key.control].forecast[month] += el.repairAndMaintenance[key.control].monthData[month];
          totalRM.forecast[month] += el.repairAndMaintenance.totalMonthData.monthData[month];
        })
      })
    })
    return { ...rmObj, totalRM };
  }

  generateMonthNullObject() {
    const keys = ReparMaintenancePreviewKeys;
    let obj: any = {};
    const budget = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };
    const forecast = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 };

    keys.forEach((key: any) => {
      obj[key.control] = {};
    })
    keys.forEach((key: any) => {
      obj[key.control].budget = cloneDeep(budget);
      obj[key.control].forecast = cloneDeep(forecast);
    })
    return obj;
  }

  generateMonthNullObj() {
    return {
      budget: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
      forecast: { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 }
    }
  }

}
