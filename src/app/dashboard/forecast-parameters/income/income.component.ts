import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { get } from 'lodash';
import { formOverlayTable } from 'src/app/shared/config/form-overlay.table';
import { incomeFormConfig, incomeFormSections, incomeFormValidation, IncomeMonthlyFormConfig } from 'src/app/shared/config/income.form';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { ForecastService } from 'src/app/shared/services/forecast.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';
import { OtherIncomePreviewKeys } from '../../../shared/config/fields';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})

export class IncomeComponent implements OnInit {
  
  public heading: string = 'Forecast Parameters : Income';
  public overlay_heading: string = '';
  // public currentMonth: number = 6;
  public currentMonth: number = new Date().getMonth();
  public category_validators= incomeFormValidation;
  public overlayData: any;
  public submitOverlayData: any;
  public otherIncomeBudgetData: any;
  public incomeForm: any;
  public workflowData: any;
  public form_fields = incomeFormConfig;
  public monthly_form_fields = IncomeMonthlyFormConfig;
  public form_sections = incomeFormSections;
  public userRole: string = '';
  public workflowStarted: boolean = false;
  public workflowDetails: any = {};
  public incomeApproved: boolean = false;
  public dataAvailable: boolean = false;
  public showSubmit: boolean = false;
  public percentThreshold: number = 0;
  public keys: any[] = OtherIncomePreviewKeys;
  public formData: any
  public table = formOverlayTable;

  constructor(
    private title: Title,
    private formService: FormService,
    private authService: AuthService,
    private workflowService: WorkflowService,
    private spinner: SpinnerService,
    private router: Router,
    private forecastService: ForecastService,
  ) {
    this.title.setTitle('Income')
  }

  ngOnInit(): void {
    this.spinner.change(false);
    this.userRole = this.authService.getUser('role');
    this.incomeForm = this.formService.generateForm(this.form_fields);
    this.monthly_form_fields.rows.forEach((form_row: any) => {
      this.incomeForm.addControl(form_row.group_name, this.generateFormControl(this.monthly_form_fields.control_names, form_row))
    })
    if (this.userRole === 'RA') this.incomeForm.disable();
    this._fetch();
  }

  generateFormControl(control_names: any, group_row: any) {
    let group: any = {}
    const validation = group_row.validation;
    let generatedForm: any;
    control_names.forEach((control_name: any, index: number) => {
      group[control_name] = new FormControl('', {
        validators: [
          Validators.pattern(validation.pattern),
          Validators.min(validation.min),
          Validators.max(validation.max),
        ]
      })
    })
    generatedForm = new FormGroup(group)
    return generatedForm;
  }

  _fetch() {
    this.getWorkflow()?.subscribe(res => {
      if (res.data) {
        this.workflowStarted = true;
        this.workflowDetails = res.data;
        this.getWorkflowData();
      }
    });
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

  getWorkflowData() {
    this.forecastService.getData(this.workflowDetails._id)
      .subscribe(res => {
        if (res.code === 200) {
          const formData = get(this.forecastService.formData, 'otherIncome');
          if (formData) this.incomeForm.patchValue(formData);
          if (!formData && res.data[0].otherIncome) this.incomeForm.patchValue({ ...res.data[0].otherIncome });
          if (res.data[0].otherIncome) this.dataAvailable = true;
          this.incomeApproved = res.data[0].otherIncomeApproved;
          this.workflowData = res.data[0];
          this.getBudgetData();
        }
      })
  }

  getBudgetData() {
    this.workflowService.getBudgetSheetData(this.workflowDetails)
      .subscribe(res => {
        if (res.code === 200) {
          this.otherIncomeBudgetData = res.data.otherIncome;
        }
      })
  }

  toggleSections(selectedSection: string) {
    this.form_sections.forEach((section: any) => {
      if (selectedSection === section.control) {
        if (section.class === 'height-0') section.class = 'toggle-active';
        else section.class = 'height-0';
      }
      else section.class = 'height-0';
    })
  }

  changeInput(category: string, value: any) {
    this.category_validators.forEach((category_validator:any)=>{
      if(category_validator.category === category){
        category_validator.controls.forEach((control:string)=>{
          if(value === ''){
            this.incomeForm.controls[control].removeValidators([Validators.required]);
            this.incomeForm.get(control).updateValueAndValidity();
            return
          }
          this.incomeForm.controls[control].setValidators([Validators.required]);
          this.incomeForm.get(control).updateValueAndValidity();
        })
      }
    })
  }

  onSave(data: any) {
    if (this.incomeForm.invalid) {
      this.incomeForm.markAllAsTouched()
      return;
    }
    this.forecastService.formData = {};
    this.forecastService.saveData(data, this.workflowDetails._id)
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

  previewData(data: any) {
    if (this.incomeForm.invalid) {
      this.incomeForm.markAllAsTouched()
      return;
    };
    if (!this.workflowData.revenueInputs) {
      this.spinner.showAlert('Please save Revenue Inputs first!', 'error');
      return;
    }
    if (this.workflowData.revenueInputs) {
      this.forecastService.formData = { otherIncome: data }
      const url: string = `/dashboard/forecast/income/preview-data`;
      const params = { type: 'otherIncome', workflow: this.workflowDetails._id };
      this.router.navigate([url], { queryParams: params });
    }
  }

  rejectWorkflow() {
    this.workflowService.rejectWorkflow(this.workflowDetails._id);
  }

  loadOverlay(label: string, controlName: string) {
    this.overlay_heading = label;
    this.overlayData = this.otherIncomeBudgetData[controlName].monthData;
    this.formService.changeOverlay(true);
  }

  showSubmitOverlay(data: any) {
    if (this.incomeForm.invalid) {
      this.incomeForm.markAllAsTouched();
      this.spinner.showAlert('Form is Invalid', 'error');
      return;
    }
    if (!this.workflowData.revenueInputs) {
      this.spinner.showAlert('Please save Revenue Inputs first!', 'error');
      return;
    }
    this.formData = { otherIncome: data };
    this.showSubmit = true;
  }

  submitOverlayResponse(response: any) {
    if (this.userRole === 'RA') {
      this.onSave({ otherIncomeApproved: true, otherIncomeCommentRA: response.reasonRA });
    }
    if (this.userRole === 'RPM') {
      this.onSave({ otherIncome: this.incomeForm.value, otherIncomeCommentRPM: response.reasonRPM })
    }
  }
}
