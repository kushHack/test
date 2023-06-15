import { Component } from '@angular/core';
import { masterConfigForm } from 'src/app/shared/config/master.table';
import { IMasterConfigForm } from 'src/app/shared/interfaces/master-data.model';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-community',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

  public heading = 'Master Data Setup: Configuration';
  public masterConfigForm: any;
  public masterConfigFormData: any;
  public configForm: IMasterConfigForm[] = masterConfigForm;

  constructor(
    private masterDataService: MasterDataService,
    private spinner: SpinnerService,
    private formService:FormService
    ) { }

  ngOnInit(): void {
    this.spinner.change(false);
    this.masterConfigForm = this.formService.generateNestedForm(this.configForm);
    this.masterDataService.getMasterConfig()
      .subscribe((res: any) => {
        this.masterConfigFormData = res.data
        this.masterConfigForm.patchValue({ ...this.masterConfigFormData })
      })
  }

  onRangeChange(form: any) {
    this.formService.onRangeChange(form, this.masterConfigForm);
  }
  onSaveConfig() {
    if (this.masterConfigForm.invalid) {
      this.masterConfigForm.markAllAsTouched();
      return;
    }
    this.spinner.change(true);
    this.masterDataService.updateMasterConfig(this.masterConfigForm.value, this.masterConfigFormData._id)
  }
}
