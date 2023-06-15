import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { get } from 'lodash';
import { expenseRMConfig1, makeReady, navTabs } from 'src/app/shared/config/expense.form';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { ForecastService } from 'src/app/shared/services/forecast.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';
import { MakeReadyPreviewKeys, ReparMaintenancePreviewKeys } from '../../../shared/config/fields';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss', '../forecast-parameters.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms',
          style({ opacity: 1 })
        )
      ])
    ])
  ]
})

export class ExpenseComponent {

  public heading: string = 'Forecast Parameters : Expense';
  public overlay_heading: string = '';
  public submitOverlayHeading: string = '';
  public submitOverlayControl: string = '';
  public overlayData: string = '';
  public navTabs = navTabs;
  public selectedIndex: number = 1;
  public expenseFormMR: any;
  public expenseFormRM: any;
  public form_MR = makeReady;
  public form_RM1 = expenseRMConfig1;
  public userRole: string = '';
  public workflowStarted: boolean = false;
  public workflowDetails: any = {};
  public rmApproved: boolean = false;
  public mrApproved: boolean = false;
  public mrAvailable: boolean = false;
  public rmAvailable: boolean = false;
  public rmBudgetData: any;
  public makeReadyBudgetData: any;
  public workflowData: any;
  public percentThreshold: number = 0;
  public keys: any[] = [];
  public showSubmit: boolean = false;
  public formData: any;
  public selectedTab: number = 0;

  constructor(
    private title: Title,
    private router: Router,
    private formService: FormService,
    private workflowService: WorkflowService,
    private authService: AuthService,
    private spinner: SpinnerService,
    private forecastService: ForecastService
  ) {
    this.title.setTitle('Expense')
  }

  toggleTabs(index: number) {
    this.navTabs.forEach((el: any, i: number) => {
      el.class = '';
      if (i == index) {
        el.class = 'active';
      }
    })
    this.selectedIndex = index + 1;
  }

  rejectWorkflow() {
    this.workflowService.rejectWorkflow(this.workflowDetails._id);
  }

  loadOverlay(label: string, controlName: string, type: string) {
    this.overlay_heading = label;
    if (type === 'rm') {
      this.overlayData = this.rmBudgetData[controlName].monthData;
    }
    if (type === 'mr') {
      this.overlayData = this.makeReadyBudgetData[controlName].monthData;
    }
    this.formService.changeOverlay(true);
  }

  ngOnInit(): void {
    this.spinner.change(false)
    this.userRole = this.authService.getUser('role');
    this._generateForms();
    if (this.userRole === 'RA') {
      this.expenseFormMR.disable();
      this.expenseFormRM.disable();
    }
    this._fetch();
  }

  _generateForms() {
    let group: any = {};
    this.form_MR.rows.forEach((form_row: any) => {
      group[form_row.group_name] = this.generateFormControl(this.form_MR.controls, form_row);
    })
    this.expenseFormMR = new FormGroup(group);
    this.expenseFormRM = this.formService.generateForm(this.form_RM1);
  }

  _fetch() {
    this.getWorkflow()?.subscribe(res => {
      if (res.data) {
        this.workflowStarted = true;
        this.workflowDetails = res.data;
        this.getWorkflowData();
      }
    })
  }

  getWorkflowData() {
    this.forecastService.getData(this.workflowDetails._id)
      .subscribe(res => {
        if (res.code === 200) {
          let formDataMR = get(this.forecastService.formData, 'makeReadyExpense');
          let formDataRM = get(this.forecastService.formData, 'repairAndMaintenance');

          if (formDataMR) this.expenseFormMR.patchValue(formDataMR);
          if (formDataRM) this.expenseFormRM.patchValue(formDataRM);
          if (!formDataMR && res.data[0].makeReadyExpense) this.expenseFormMR.patchValue({ ...res.data[0].makeReadyExpense });
          if (!formDataRM && res.data[0].repairAndMaintenance) this.expenseFormRM.patchValue({ ...res.data[0].repairAndMaintenance });
          if (res.data[0].makeReadyExpense) this.mrAvailable = true;
          if (res.data[0].repairAndMaintenance) this.rmAvailable = true;

          this.mrApproved = res.data[0].makeReadyApproved;
          this.rmApproved = res.data[0].repairAndMaintenanceApproved;
          this.workflowData = res.data[0];
          this.getBudgetData();
        }
      })
  }

  getWorkflow() {
    const email = this.authService.getUser('email');
    if (this.userRole === 'RA') {
      return this.workflowService.getReviewWorkflow(email);
    }
    if (this.userRole === 'RPM') {
      return this.workflowService.getStartedWorkflow(email);
    }
    return;
  }

  generateFormControl(control_names: any, group_row: any) {
    let group: any = {}
    const validation = group_row.validation;
    let generatedForm: any;
    control_names.forEach((control: any) => {
      group[control.name] = new FormControl('', {
        validators: [
          Validators.pattern(validation.pattern),
          Validators.min(validation.min),
          Validators.max(validation.max)
        ]
      });
    })
    generatedForm = new FormGroup(group)
    return generatedForm;
  }

  getBudgetData() {
    this.workflowService.getBudgetSheetData(this.workflowDetails)
      .subscribe(res => {
        if (res.code === 200) {
          this.rmBudgetData = res.data.repairAndMaintenance;
          this.makeReadyBudgetData = res.data.makeReadyExpense;
        }
      })
  }

  submitOverlayResponse(response: any) {
    if (this.selectedTab === 1) {
      if (this.userRole === 'RA') {
        this.onSave({ makeReadyApproved: true, makeReadyCommentRA: response.reasonRA }, this.selectedTab);
      }
      if (this.userRole === 'RPM') {
        this.onSave({ makeReadyExpense: this.expenseFormMR.value, makeReadyCommentRPM: response.reasonRPM }, this.selectedTab)
      }
    }
    if (this.selectedTab === 2) {
      if (this.userRole === 'RA') {
        this.onSave({ repairAndMaintenanceApproved: true, rmCommentRA: response.reasonRA }, this.selectedTab);
      }
      if (this.userRole === 'RPM') {
        this.onSave({ repairAndMaintenance: this.expenseFormRM.value, rmCommentRPM: response.reasonRPM }, this.selectedTab)
      }
    }
  }

  onSave(data: any, tab: number) {
    if (tab === 1) {
      if (this.expenseFormMR.invalid) {
        this.expenseFormMR.markAllAsTouched()
        return;
      }
      this.saveData(data, this.workflowDetails._id);
    }
    if (tab === 2) {
      if (this.expenseFormRM.invalid) {
        this.expenseFormRM.markAllAsTouched()
        return;
      }
      this.saveData(data, this.workflowDetails._id);
    }
  }

  saveData(data: any, id: string) {
    this.forecastService.formData = {};
    this.forecastService.saveData(data, id)
      .subscribe(res => {
        if (res.code === 200) {
          this.getWorkflowData();
          if (this.userRole === 'RPM') {
            this.spinner.showAlert('Data Successfully Saved', 'success');
          }
          if (this.userRole === 'RA') {
            this.spinner.showAlert('Data Approved', 'success');
          }
        }
      })
  }

  previewData(formData: any, tab: number) {
    let params: any = {};
    if (tab === 1) {
      if (this.expenseFormMR.invalid) {
        this.expenseFormMR.markAllAsTouched()
        return;
      };
      params = { type: 'makeReadyExpense', workflow: this.workflowDetails._id };
    }
    if (tab === 2) {
      if (this.expenseFormRM.invalid) {
        this.expenseFormRM.markAllAsTouched()
        return;
      };
      params = { type: 'repairAndMaintenance', workflow: this.workflowDetails._id };
    }
    this.forecastService.formData = formData
    const url: string = `/dashboard/forecast/expense/preview-data`;
    this.router.navigate([url], { queryParams: params });
  }

  showSubmitOverlay(data: any, tab: number) {
    this.selectedTab = tab;
    if (tab === 1) {
      if (this.expenseFormMR.invalid) {
        this.expenseFormMR.markAllAsTouched()
        return;
      };
      this.formData = data;
      this.keys = MakeReadyPreviewKeys;
      this.submitOverlayControl = 'makeReadyExpense';
      this.submitOverlayHeading = 'Make-Ready Expense Forecast Summary'
    }
    if (tab === 2) {
      if (this.expenseFormRM.invalid) {
        this.expenseFormRM.markAllAsTouched()
        return;
      };
      this.formData = data;
      this.keys = ReparMaintenancePreviewKeys;
      this.submitOverlayControl = 'repairAndMaintenance';
      this.submitOverlayHeading = 'Repair & Maintenance Expense Forecast Summary';
    }
    this.showSubmit = true;
  }


  ngOnDestroy() {
    this.navTabs[0].class = 'active';
    this.navTabs[1].class = '';
  }
}
