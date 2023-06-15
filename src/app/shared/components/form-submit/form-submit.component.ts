import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash';
import { formSubmitTable } from '../../config/form-overlay.table';
import { AuthService } from '../../services/auth-service.service';
import { ForecastService } from '../../services/forecast.service';
import { MasterDataService } from '../../services/master-data.service';
import { WorkflowService } from '../../services/workflow.service';
import { SpinnerService } from '../../utils/spinner.utils';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms',
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms',
          style({ opacity: 0 })
        )
      ])
    ])
  ]
})

export class FormSubmitComponent {

  @Input() heading: string = '';
  @Input() workflow: any;
  @Input() workflowInstance: any;
  @Input() control: any;
  @Input() formData: any;
  @Input() keys: any[] = [];

  @Output() close = new EventEmitter();
  @Output() reponse = new EventEmitter();

  public table = formSubmitTable;
  public show = false;
  public tableData: any[] = [];
  public userRole = '';
  public requiredBudgetData: any;
  public requiredForecastData: any;
  public percent: number = 0;
  public commentControlRA: string = '';
  public commentControlRPM: string = '';
  public dataAvailable: boolean = false;

  reasonForm = new FormGroup({
    reasonRPM: new FormControl(''),
    reasonRA: new FormControl(''),
  });

  get reasonRPM() {
    return this.reasonForm.get('reasonRPM');
  }
  get reasonRA() {
    return this.reasonForm.get('reasonRA');
  }

  constructor(
    private spinner: SpinnerService,
    private authService: AuthService,
    private forecastService: ForecastService,
    private workflowService: WorkflowService,
    private masterService: MasterDataService
  ) { }

  closeOverlay() {
    this.close.emit(false);
  }

  submit(reason: string) {
    if (this.reasonForm.invalid) {
      this.reasonForm.markAllAsTouched();
      return
    }
    this.show = false;
    this.reponse.emit(reason);
    this.close.emit(false);
  }

  reject(data: any) {
    if (this.reasonForm.invalid) {
      this.reasonForm.markAllAsTouched();
      return
    }
    let obj: any = {};
    obj[this.commentControlRA] = data.reasonRA
    this.forecastService.saveData(obj, this.workflow._id)
      .subscribe(res => {
        if (res.code === 200) {
          this.workflowService.rejectWorkflow(this.workflow._id);
        }
        else {
          this.spinner.showAlert(res.message, 'error');
        }
      })
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUser('role');
    console.log(this.formData);
    this.config();
    this.patchFormValue();
    this._fetchData();
  }

  config() {
    if (this.userRole === 'RA') {
      this.reasonRA?.addValidators(Validators.required);
      this.reasonRPM?.addValidators(Validators.required);
      this.reasonRPM?.disable();
    }
    if (this.userRole === 'RPM') {
      this.reasonRPM?.addValidators(Validators.required);
      this.reasonRA?.disable();
    }
  }

  patchFormValue() {
    switch (this.control) {
      case 'rentalIncome':
        this.commentControlRA = 'revenueInputCommentRA';
        this.commentControlRPM = 'revenueInputCommentRPM';
        break;

      case 'otherIncome':
        this.commentControlRA = 'otherIncomeCommentRA';
        this.commentControlRPM = 'otherIncomeCommentRPM';
        break;

      case 'makeReadyExpense':
        this.commentControlRA = 'makeReadyCommentRA';
        this.commentControlRPM = 'makeReadyCommentRPM';
        break;

      case 'repairAndMaintenance':
        this.commentControlRA = 'rmCommentRA';
        this.commentControlRPM = 'rmCommentRPM';
        break;

      default:
        break;
    };
    let reasonRA = get(this.workflowInstance, this.commentControlRA);
    let reasonRPM = get(this.workflowInstance, this.commentControlRPM);
    if (reasonRA) {
      this.dataAvailable = true;
      this.reasonForm.patchValue({ reasonRA })
    }
    if (reasonRPM) this.reasonForm.patchValue({ reasonRPM })
  }

  _fetchData() {
    this.masterService.getMasterConfig()
      .subscribe(res => {
        if (res.code === 200) {
          this.percent = res.data.precentage_threshold;
          this.getForecastData();
        }
      })
  }

  getForecastData() {
    this.forecastService.getForecast(this.workflow._id, this.workflow.community, this.formData)
      .subscribe(res => {
        if (res.code === 200) {
          this.requiredForecastData = res.data.forecast[this.control];
          this.requiredBudgetData = res.data.foreact[this.control];
          this.getTableRows();
        }
        else {
          this.spinner.showAlert(res.message, 'error');
        }
      })
  }

  getTableRows() {
    this.keys.forEach((key: any) => {
      let budget = this.requiredBudgetData[key.control].total;
      let forecast = this.requiredForecastData[key.control].total;
      let variance = 0; let change = 0;
      variance = forecast - budget;
      change = (variance / budget) * 100;
      if (change > this.percent) {
        this.tableData.push({ title: key.view, budget, forecast, variance, change: change.toFixed(2), state: 'green' });
      }
      if (change < -this.percent) {
        this.tableData.push({ title: key.view, budget, forecast, variance, change: change.toFixed(2), state: 'red' });
      }
    })
    if (!this.tableData.length) {
      this.show = false;
      this.reponse.emit('');
      this.close.emit(false);
      return;
    }
    this.show = true;
  }

}
