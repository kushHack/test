import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { mriForm } from 'src/app/shared/config/mri-data.form';
import { CommunityService } from 'src/app/shared/services/community.service';
import { ExportDataService } from 'src/app/shared/services/export-data.service';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import * as XLSX from 'xlsx';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-export-reports',
  templateUrl: './export-reports.component.html',
  styleUrls: ['./export-reports.component.scss']
})

export class ExportReportComponent implements OnInit {

  heading: string = 'Export Reports';
  public form_fields: any = mriForm;
  public mriForm: any;
  public versions: any[] = [];

  constructor(
    private title: Title,
    private formService: FormService,
    private communityService: CommunityService,
    private exportDataService: ExportDataService,
    private spinner: SpinnerService,
    private workflowService: WorkflowService
  ) {
    this.title.setTitle('Export Reports');
  }

  reportForm = new FormGroup({
    fileType: new FormControl('', {
      validators: [Validators.required],
    }),
    summaryType: new FormControl('', {
      validators: [Validators.required],
    })
  })

  get fileType() {
    return this.reportForm.get('fileType');
  }
  get summaryType() {
    return this.reportForm.get('summaryType');
  }

  onSubmit(data: any) {
    if (this.mriForm.invalid) {
      this.mriForm.markAllAsTouched()
      return;
    }
    this.spinner.showAlert('File will be download soon', 'success');
    this.exportDataService.getMRI(data.version, data.community)
      .subscribe(res => {
        if (res.code === 200) {
          const fileName = `MRI_${data.community}_${data.version}.xlsx`;
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res.data);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'test');
          XLSX.writeFile(wb, fileName);
        }
        if (res.code === 401) {
          this.spinner.showAlert(res.message, 'error');
        }
      })
  }

  downloadSummaryReport(formData: any) {
    if (this.reportForm.invalid) {
      return;
    }
    this.spinner.showAlert('File will be download soon', 'success');
    this.exportDataService.getPDF(formData).subscribe(res => {
      if (res.code === 200) {
        pdfMake.createPdf(res.data).download('Roll-Up Fund Detail.pdf');
      }
      if (res.code === 401) {
        this.spinner.showAlert(res.message, 'error');
      }
    })
  }

  ngOnInit(): void {
    this.spinner.change(false);
    this.mriForm = this.formService.generateForm(this.form_fields);
    this._getRPM();
  }

  _getRPM() {
    this.form_fields[0].options = [];
    this.communityService.getRPM()
      .subscribe(response => {
        response.data.forEach((element: any) => {
          let obj = { value: element.email, viewValue: element.name };
          this.form_fields[0].options?.push(obj);
        });
      })
  }

  onChange(control_name: string, event: any) {
    if (event.target.value === '') return;
    if (control_name === 'rpm') {
      this.mriForm.markAsUntouched();
      this.form_fields[1].options = [];
      this.mriForm.get('community').setValue("");
      this.communityService.getCommunitiesRPM(event.target.value)
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
    if (control_name === 'community') {
      this.workflowService.getApprovedVersionByCommunity(event.target.value, new Date().getFullYear())
        .subscribe(res => {
          if (res.code === 200) {
            res.data.forEach((el: any) => {
              const obj = { value: el, viewValue: `v${el}` };
              this.form_fields[2].options?.push(obj);
            })
          }
        })
    }
  }

}
