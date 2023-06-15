import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import {
  AllocatedExpenses,
  AssociationFeeDeficitFunding,
  DebtService,
  GeneralAdministrative,
  ImprovementCapital,
  InsuranceExpenses,
  LeasingAdvertisePromotion,
  LeasingCommissions,
  MakeReadyExpense,
  OperatingCapital,
  OtherIncome,
  OtherIncomeAndExpenses,
  PayrollExpense,
  ProfessionalFee,
  RealEstateTaxOtherTax,
  RecoveryIncome,
  RentalIncome,
  RepairMaintenanceExpense,
  ServiceContracts,
  Utilities
} from 'src/app/shared/config/community-xlsx';
import { initiateWorkflowConfig } from 'src/app/shared/config/initiate-workflow.form';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { CommunityService } from 'src/app/shared/services/community.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';
import { XLSXService } from 'src/app/shared/utils/xlsx.utils';

@Component({
  selector: 'app-initiate-workflow',
  templateUrl: './initiate-workflow.component.html',
  styleUrls: ['./initiate-workflow.component.scss']
})
export class InitiateWorkflowComponent {

  public heading: string = 'Initiate Workflow';
  public filename: string = '';
  public rrDumpFileName: string = '';
  public form_fields: any = initiateWorkflowConfig;
  public workflowForm: any;
  public communityForeactSheet: any;
  public communityBudgetSheet: any;
  public communityActualSheet: any;
  public communityUnits: any = {};
  public submitDisabled: boolean = true;
  public userEmail: string = '';
  public sheetAlreadyExist: boolean = true;
  public rrDumpExists: boolean = true;

  constructor(private title: Title,
    private formService: FormService,
    private spinner: SpinnerService,
    private authservice: AuthService,
    private workflowService: WorkflowService,
    private communityService: CommunityService,
    private xlsxService: XLSXService) {
    this.title.setTitle('Initiate Workflow');
  }

  ngOnInit(): void {
    this.spinner.change(false);
    this.userEmail = this.authservice.getUser('email');
    this.workflowForm = this.formService.generateForm(this.form_fields);
    this.form_fields.forEach((element: any, index: number) => {
      if (element.control_name === 'rpm') { this._getRPM(index); }
      if (element.control_name === 'quarter') {
        element.options = this.formService.quartersValidate();
      }
    })
  }

  _getRPM(index: number) {
    this.form_fields[index].options = [];
    this.communityService.getRPM()
      .subscribe(response => {
        response.data.forEach((element: any) => {
          let obj = { value: element.email, name: element.name, viewValue: element.name };
          this.form_fields[index].options?.push(obj);
        });
      })
  }

  onChangeRPM(control_name: string, event: any) {
    if (event.target.value === '') return;
    if (control_name === 'rpm') {
      this.workflowForm.markAsUntouched();
      this.form_fields[1].options = [];
      this.workflowForm.get('community').setValue("");
      this.communityService.getCommunitiesRPM(this.workflowForm.get("rpm").value)
        .subscribe(response => {
          if (!response.data.length) {
            let obj = { value: "", viewValue: "No Community Found" };
            this.form_fields[1].options?.push(obj);
            return;
          }
          response.data.forEach((element: any) => {
            let obj = { value: element.communityId, viewValue: element.communityName };
            this.form_fields[1].options?.push(obj);
          })
        })
    }
  }

  async changeFile(path: string, event: any) {
    const pathArray = path.split("\\");
    this.filename = pathArray[pathArray.length - 1];
    let file = event.target.files[0];
    let binaryString = await this.xlsxService.readExcel(file);
    let worksheet = this.xlsxService.binaryToSheet(binaryString);
    await this.foreactSheet(worksheet);
  }

  async foreactSheet(worksheet: any) {
    let rentalIncome = this.getObject(worksheet, RentalIncome);
    let recoveryIncome = this.getObject(worksheet, RecoveryIncome);
    let otherIncome = this.getObject(worksheet, OtherIncome);
    let payrollExpense = this.getObject(worksheet, PayrollExpense);
    let makeReadyExpense = this.getObject(worksheet, MakeReadyExpense);
    let serviceContracts = this.getObject(worksheet, ServiceContracts);
    let repairAndMaintenance = this.getObject(worksheet, RepairMaintenanceExpense);
    let utilities = this.getObject(worksheet, Utilities);
    let professionalFees = this.getObject(worksheet, ProfessionalFee);
    let generalAndAdministrative = this.getObject(worksheet, GeneralAdministrative);
    let leasingAdvertiseAndPromotion = this.getObject(worksheet, LeasingAdvertisePromotion);
    let realEstateTaxAndOthertaxes = this.getObject(worksheet, RealEstateTaxOtherTax);
    let insuranceExpense = this.getObject(worksheet, InsuranceExpenses);
    let associationFeeDeficitFunding = this.getObject(worksheet, AssociationFeeDeficitFunding);
    let debtService = this.getObject(worksheet, DebtService);
    let improvementCapital = this.getObject(worksheet, ImprovementCapital);
    let operatingCapital = this.getObject(worksheet, OperatingCapital);
    let leasingCommision = this.getObject(worksheet, LeasingCommissions);
    let allocatedExpenses = this.getObject(worksheet, AllocatedExpenses);
    let otherIncomeAndExpense = this.getObject(worksheet, OtherIncomeAndExpenses);
    this.communityForeactSheet = {
      rentalIncome,
      recoveryIncome,
      otherIncome,
      payrollExpense,
      makeReadyExpense,
      serviceContracts,
      repairAndMaintenance,
      utilities,
      professionalFees,
      generalAndAdministrative,
      leasingAdvertiseAndPromotion,
      realEstateTaxAndOthertaxes,
      insuranceExpense,
      associationFeeDeficitFunding,
      debtService,
      improvementCapital,
      operatingCapital,
      leasingCommision,
      allocatedExpenses,
      otherIncomeAndExpense,
    };
    this.communityForeactSheet.year = new Date().getFullYear();
  }

  getObject(worksheet: any, rows: any) {
    let finalObj = {};
    rows.forEach((element: any) => {
      let data = this.xlsxService.getExcelByRange(worksheet, element.range);
      let obj: any = {};
      obj[element.type] = data;
      Object.assign(finalObj, obj)
    })
    return finalObj;
  }

  async rrDumpInput(path: string, event: any) {
    const pathArray = path.split("\\");
    this.rrDumpFileName = pathArray[pathArray.length - 1];
    let file = event.target.files[0];
    let binaryString = await this.xlsxService.readExcel(file);
    let worksheet = this.xlsxService.binaryToSheet(binaryString);
    const range_data: any = XLSX.utils.sheet_to_json(worksheet, { range: 'U4:U7', header: 1 });
    let units: any = {};
    units.studio = range_data[2][0];
    units.oneBedroom = range_data[1][0];
    units.twoBedroom = range_data[0][0];
    units.threeBedroom = 0;
    units.fourBedroom = range_data[3][0];
    units.total = units.studio + units.oneBedroom + units.twoBedroom + units.threeBedroom + units.fourBedroom;
    this.communityUnits = {
      year: new Date().getFullYear(),
      units
    }
    if (this.communityActualSheet) {
      this.submitDisabled = false
    }
  }

  onSubmit(data: any) {
    if (this.workflowForm.invalid) {
      this.workflowForm.markAllAsTouched()
      return;
    }
    data.year = new Date().getFullYear();
    this.form_fields[0].options?.forEach((element: any) => {
      if (element.value === data.rpm)
        data.rpmName = element.viewValue;
    })
    this.form_fields[1].options?.forEach((element: any) => {
      if (element.value === data.community)
        data.communityName = element.viewValue;
    })
    this.communityForeactSheet.community = data.community;
    this.communityUnits.community = data.community;
    let formData = {
      communityForeact: this.communityForeactSheet,
      workflow: data,
      communityUnits: this.communityUnits
    };
    this.workflowService.createWorkflow(formData);
  }
}
