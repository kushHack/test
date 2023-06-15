import { Component, EventEmitter, Input, Output } from '@angular/core';
import { communityForm } from 'src/app/shared/config/community';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { animate, style, transition, trigger } from '@angular/animations';
import { AddCommunity, ICommunityForm, IRpm } from 'src/app/shared/interfaces/community.model';
import { CommunityService } from 'src/app/shared/services/community.service';

@Component({
  selector: 'app-community-form',
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.scss'],
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
export class CommunityFormComponent {

  @Output() close = new EventEmitter();
  @Output() formData = new EventEmitter();
  @Input() method: string = '';
  @Input() community: any;
  public communityForm: any;
  public formConfig: any = communityForm;
  public form_heading: string = 'Add New Community'

  constructor(private formService: FormService, private communityService: CommunityService) { }

  closeForm() {
    this.close.emit(false)
  }

  createCommunity(value: AddCommunity) {
    if (this.communityForm.invalid) {
      return this.communityForm.markAllAsTouched()
    }
    let data = { form: value, method: this.method };
    this.formData.emit(data);
  }

  updateCommunity(value: AddCommunity) {
    if (this.communityForm.invalid) {
      return this.communityForm.markAllAsTouched()
    }
    let updateData: any = value;
    updateData.id = this.community._id;
    let data = { form: updateData, method: this.method };
    this.formData.emit(data);
  }

  ngOnInit(): void {
    this.communityForm = this.formService.generateNestedForm(this.formConfig);
    if (this.method === 'update') {
      this.form_heading = `Update Community: ${this.community.communityName}`;
      this.communityForm.patchValue({ ...this.community })
    }
    this.fetchRpm()
  }

  fetchRpm() {
    this.communityService.rpmList.subscribe({
      next: (rpmList) => {
        rpmList?.forEach((rpm: IRpm) => {
          this.formConfig[5].options?.push({ value: rpm.email, viewValue: rpm.name })
        });
      }
    })
  }

  selectName(form: any) {
    form.options.forEach((option: any) => {
      if (option.value === this.communityForm.get('rpmEmail').value) {
        this.communityForm.patchValue({ rpm: option.viewValue })
      }
    })

  }

  ngOnDestroy() {
    this.communityForm.reset();
    this.formConfig[5].options = [];
  }

}
