import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { cloneDeep, get } from 'lodash';
import { revenueInput, revenueInputOther, sampledata } from 'src/app/shared/config/revenue-input.table';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { ForecastService } from 'src/app/shared/services/forecast.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';
import { RentalIncomePreviewKeys } from '../../../shared/config/fields';
import { MasterDataService } from 'src/app/shared/services/master-data.service';

@Component({
  selector: 'app-revenue-input',
  templateUrl: './revenue-input.component.html',
  styleUrls: ['./revenue-input.component.scss']
})

export class RevenueInputComponent {
  public heading: string = 'Forecast Parameters : Revenue Input';
  public userRole: string = '';
  public revenueForm: any;
  public revenueOtherForm: any;
  // public currentMonth: any = 6
  public currentMonth:any = new Date().getMonth();
  public table = revenueInput;
  public table2 = revenueInputOther;
  public sampleData = sampledata;
  public workflowStarted: boolean = false;
  public workflowDetails: any = {};
  public workflowData: any;
  public otherRevenueInputs: any;
  public revenueInputApproved: any = {};
  public dataAvailable: boolean = false;
  public revenueInputsFetched: boolean = false;
  public showSubmit: boolean = false;
  public keys: any[] = RentalIncomePreviewKeys;
  public formData: any;
  public months: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


  constructor(
    private title: Title,
    private router: Router,
    private formService: FormService,
    private authService: AuthService,
    private spinner: SpinnerService,
    private forecastService: ForecastService,
    private workflowService: WorkflowService,
    private masterDataService: MasterDataService
  ) {
    this.title.setTitle('Revenue Input')
  }

  onSave(data: any) {
    if (this.revenueForm.invalid) {
      this.revenueForm.markAllAsTouched()
      return
    };
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

  generateRevenueInputNumbers(formData: any) {
    if (this.revenueForm.invalid) {
      this.revenueForm.markAllAsTouched()
      return
    };
    this.forecastService.getRevenueInputNumbers(formData, this.workflowDetails)
      .subscribe(res => {
        if (res.code === 200) {
          this.otherRevenueInputs = res.data;
          this.revenueInputsFetched = true;
          this.revenueOtherForm.patchValue(this.otherRevenueInputs);
        }
      })
  }

  onChangeValue(group_name: string, control: string, event: any) {
    if (this.revenueForm.get(group_name)?.get(control).invalid) {
      return
    };
    if (group_name === 'retention') {
      let obj: any = {};
      this.months.forEach((month: string, index: number) => {
        if (index < this.currentMonth - 1) obj[month] = "";
        if (index >= this.currentMonth) obj[month] = event.target.value;
      })
      this.revenueForm.patchValue({ retention: obj })
    }
  }

  previewData() {
    if (this.revenueForm.invalid) {
      this.revenueForm.markAllAsTouched()
      return
    };
    let data = { ...this.revenueForm.value, ...this.revenueOtherForm.value };
    this.forecastService.formData = { revenueInputs: data };
    const url: string = `/dashboard/forecast/revenue-input/preview-data`;
    const params = { type: 'rentalIncome', workflow: this.workflowDetails._id };
    this.router.navigate([url], { queryParams: params });
  }

  rejectWorkflow() {
    this.workflowService.rejectWorkflow(this.workflowDetails._id);
  }

  fillData() {
    this.revenueForm.patchValue({ ...this.sampleData })
  }

  ngOnInit(): void {
    this.spinner.change(false);
    this.userRole = this.authService.getUser('role');
    this._fetchMasterConfig();
    this._fetch();
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

  _fetchMasterConfig() {
    this.masterDataService.getMasterConfig().subscribe({
      next: (masterConfig) => {
        let i = 0;
        this.table.rows.forEach((row) => {
          if (i < 4) {
            let obj: any = Object.values(masterConfig.data.revenue_config)[i];
            row.validation.min = Number(Object.values(obj)[0]);
            row.validation.max = Number(Object.values(obj)[1]);
            i++;
          }
        });
        this.generateForm();
      },
    });
  }

  generateForm() {
    let group: any = {};
    this.table.rows.forEach((form_row: any) => {
      group[form_row.group_name] = this.formService.generateFormControl(
        this.table.control_names,
        form_row
      );
    });
    this.revenueForm = new FormGroup(group);
    let group2: any = {};
    this.table2.rows.forEach((form_row: any) => {
      group2[form_row.group_name] = this.formService.generateFormControl(
        this.table2.control_names,
        form_row
      );
    });
    this.revenueOtherForm = new FormGroup(group2);
    if (this.userRole === "RA") this.revenueForm.disable();
  }

  getWorkflowData() {
    this.forecastService.getData(this.workflowDetails._id)
      .subscribe(res => {
        if (res.code === 200) {
          const formData = get(this.forecastService.formData, 'revenueInputs');
          if (formData) {
            this.revenueForm.patchValue(formData);
            this.revenueOtherForm.patchValue(formData);
          }
          if (!formData && res.data[0].revenueInputs) {
            this.revenueForm.patchValue({ ...res.data[0].revenueInputs });
            this.revenueOtherForm.patchValue({ ...res.data[0].revenueInputs });
          }
          if (res.data[0].revenueInputs) {
            this.dataAvailable = true;
            this.revenueInputApproved = res.data[0].revenueInputsApproved;
            this.workflowData = res.data[0];
            this.otherRevenueInputs = res.data[0].revenueInputs;
            if (
              this.otherRevenueInputs['occupiedUnits'] ||
              this.otherRevenueInputs['renewals'] ||
              this.otherRevenueInputs['moveins'] ||
              this.otherRevenueInputs['moveouts']) {
              this.revenueInputsFetched = true;
            }
          }
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

  showSubmitOverlay() {
    if (this.revenueForm.invalid || this.revenueOtherForm.invalid) {
      this.revenueForm.markAllAsTouched();
      this.revenueOtherForm.markAllAsTouched();
      this.spinner.showAlert('Form is Invalid', 'error');
      return;
    }
    let data = { ...this.revenueForm.value, ...this.revenueOtherForm.value };
    this.formData = { revenueInputs: data }
    this.showSubmit = true;
  }

  submitOverlayResponse(response: any) {
    this.showSubmit = false;
    if (this.userRole === 'RA') {
      this.onSave({ revenueInputsApproved: true, revenueInputCommentRA: response.reasonRA });
    }
    if (this.userRole === 'RPM') {
      const data = { ...this.revenueForm.value, ...this.revenueOtherForm.value };
      this.onSave({ revenueInputs: data, revenueInputCommentRPM: response.reasonRPM })
    }
  }

}
