import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ForecastService } from 'src/app/shared/services/forecast.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';
import { MakeReadyPreviewKeys, OtherIncomePreviewKeys, RentalIncomePreviewKeys, ReparMaintenancePreviewKeys } from '../../../shared/config/fields';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})

export class PreviewComponent {

  public heading: string = 'Preview Data: ';
  public workflowId: string = '';
  public navigateUrl: string = '/dashboard/forecast/';
  public summary: any;
  public summaryTitle: string = '';
  public subSummary: any;
  public subSummaryTitle: any;
  public type: string = '';
  public fetchDone: boolean = false;
  public subFetchDone: boolean = false;
  public workflowDetails: any;
  public requiredForecastData: any;
  public requiredBudgetData: any;
  public requiredBudget: any;
  public chartData: any;
  public subChartData: any;
  public subChartTitle: any;
  public xAxisRow: any;
  public formData: any;
  public keys:any[]=[];

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private forecastService: ForecastService,
    private spinner: SpinnerService
  ) {
    this.title.setTitle('Preview Data');
  }

  navigate(){
    this.router.navigate([this.navigateUrl]);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.workflowId = params['workflow'];
      this.type = params['type'];
    });
    this.formData = cloneDeep(this.forecastService.formData);
    if (!this.workflowId || !this.type) {
      this.spinner.showAlert('Some Error Occured! Please try again later', 'error');
      this.router.navigate(['/dashboard/workflow/task-queue']);
    }
    if (this.type && this.workflowId) {
      this.typeBasedConfiguration();
      this._fetchData();
    }
  }

  typeBasedConfiguration() {
    if (this.type === 'otherIncome') {
      this.navigateUrl = this.navigateUrl + 'income';
      this.heading = this.heading + 'Other Income';
      this.summaryTitle = 'Total Other Income';

    }
    if (this.type === 'rentalIncome') {
      this.navigateUrl = this.navigateUrl + 'revenue-input';
      this.heading = this.heading + 'Rental Income';
      this.summaryTitle = 'Total Rental Income';
    }
    if (this.type === 'makeReadyExpense') {
      this.navigateUrl = this.navigateUrl + 'expense';
      this.heading = this.heading + 'Make Ready Expense';
      this.summaryTitle = 'Total Make Ready Expense';
    }
    if (this.type === 'repairAndMaintenance') {
      this.navigateUrl = this.navigateUrl + 'expense';
      this.heading = this.heading + 'Repair and Maintenance Expense';
      this.summaryTitle = ' Total Repair and Maintenance';
    }
    if (!this.formData) {
      this.router.navigate([this.navigateUrl]);
    }
  }

  _fetchData() {
    this.getWorkflowData();
  }

  getWorkflowData() {
    this.workflowService.getWorkflowById(this.workflowId)
      .subscribe(res => {
        if (res.code === 200) {
          this.workflowDetails = res.data;
          this.getForecastData();
        }
        else {
          this.spinner.showAlert(res.message, 'error');
          this.router.navigate([this.navigateUrl])
        }
      })
  }

  getForecastData() {
    this.forecastService.getForecast(this.workflowId, this.workflowDetails.community, this.formData)
      .subscribe(res => {
        if (res.code === 200) {
          this.requiredForecastData = res.data.forecast[this.type];
          this.requiredBudgetData = res.data.foreact[this.type];
          this.requiredBudget = res.data.budget[this.type];
          this.generateChartData();
        }
        else {
          this.spinner.showAlert(res.message, 'error');
          this.router.navigate([this.navigateUrl]);
        }
      })
  };

  generateChartData() {
    let barNames: string[] = [];
    let chart_data: any = {
      budget: {},
      forecast: {}
    }
    if (this.type === 'otherIncome') this.keys = OtherIncomePreviewKeys;
    if (this.type === 'rentalIncome') this.keys = RentalIncomePreviewKeys;
    if (this.type === 'makeReadyExpense') this.keys = MakeReadyPreviewKeys;
    if (this.type === 'repairAndMaintenance') this.keys = ReparMaintenancePreviewKeys;
    if (this.keys.length) {
      this.keys.forEach((key: any) => {
        barNames.push(key.view);
        Object.assign(chart_data.budget, { [key.control]: this.requiredBudgetData[key.control].total });
        Object.assign(chart_data.forecast, { [key.control]: this.requiredForecastData[key.control].total });
      });
      this.chartData = chart_data;
      this.xAxisRow = barNames;
      this.summary = this.calcSummaryOverall();
      this.fetchDone = true;
    }
  }

  calcSummaryOverall() {
    let budget: any = this.requiredBudget.total;
    let forecast: any = this.requiredForecastData.total;
    let variance = forecast - budget;
    let change = (variance / budget) * 100;
    return { budget, forecast, variance, change: change.toFixed(2) };
  }

  onBarClick(event: any){
    this.subFetchDone = false;
    const control = this.keys[event].control;
    let sub_chartData:any ={
      budget:{},
      forecast:{}
    }
    Object.assign(sub_chartData.budget, this.requiredBudgetData[control].monthData);
    Object.assign(sub_chartData.forecast, this.requiredForecastData[control].monthData);
    this.subChartData = sub_chartData;
    this.subChartTitle =`Budget vs Forecast: ${this.keys[event].view}`;
    this.subSummaryTitle =`Total ${this.keys[event].view}`;
    this.subSummary = this.calcSubChartSummary(control);
    setTimeout(()=>{
      this.subFetchDone = true;
    }, 200)
  }

  calcSubChartSummary(control:string){
    let budget = this.requiredBudget[control];
    let forecast = this.requiredForecastData[control].total;
    let variance = forecast - budget;
    let change = (variance / budget) * 100;
    return { budget, forecast, variance, change: change.toFixed(2) };
  }
}
