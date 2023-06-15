import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { get } from 'lodash';
import { EventEmitter, Output } from '@angular/core';
import { IMasterConfigForm } from '../interfaces/master-data.model';

@Injectable({
    providedIn: 'root'
})

export class FormService {

    @Output() loading = new EventEmitter();
    @Output() submit = new EventEmitter();

    changeOverlay(value: boolean) {
        this.loading.emit(value);
    }
    openSubmitOverlay(value: boolean) {
        this.submit.emit(value);
    }
    getOverlayEmittedValue() {
        return this.loading;
    }
    getSubmitEmittedValue() {
        return this.submit;
    }

    quartersValidate() {
        let opt = [
            { value: 'q1', month: 3, viewValue: 'January - March', disabled: false },
            { value: 'q2', month: 6, viewValue: 'April - June', disabled: false },
            { value: 'q3', month: 9, viewValue: 'July - September', disabled: false },
            { value: 'q4', month: 12, viewValue: 'October - December', disabled: false }
        ];
        // const date = new Date();
        // const month = date.getMonth() + 1;
        // let options = opt.map((element: any) => {
        //     if (month > 3 && element.month === 3) {
        //         element.disabled = true;
        //     }
        //     if (month > 6 && element.month === 6) {
        //         element.disabled = true;
        //     }
        //     if (month > 9 && element.month === 9) {
        //         element.disabled = true;
        //     }
        //     if (month > 12 && element.month === 12) {
        //         element.disabled = true;
        //     }
        //     return element;
        // })
        // return options;
        return opt;
    }

  generateFormGroup(form: any) {

    let group: any = {};
    form.forEach((form_field: any) => {
      if (form_field.required) {
      group[form_field.control_name] = new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern(form_field.pattern),
          Validators.min(form_field.min),
          Validators.max(form_field.max),
        ],

      });
      } else {
        group[form_field.control_name] = new FormControl("", {
          validators: [
            Validators.pattern(form_field.pattern),
            Validators.min(form_field.min),
            Validators.max(form_field.max),
          ],

        });
      }

    });
    return group;
  }
  generateForm(form: any) {
    let generatedForm: any;
    let group = this.generateFormGroup(form);
    generatedForm = new FormGroup(group);
    return generatedForm;
  }

  createFormControl(form_field: IMasterConfigForm, group: any) {

    if (form_field.required) {
      group[form_field.control_name] = new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern(form_field.pattern!),
          Validators.min(form_field.min!),
          Validators.max(form_field.max!),
        ],

      });
    } else {
      group[form_field.control_name] = new FormControl("", {
        validators: [
          Validators.pattern(form_field.pattern!),
          Validators.min(form_field.min!),
          Validators.max(form_field.max!),
        ],

      });
    }


    return group;
  }
  createFormGroup(form: IMasterConfigForm[]) {
    let subGroup: any = {}
    form?.forEach((form_feild: any) => {
      if (form_feild.nested) {
        subGroup[form_feild.control_name] = this.createFormGroup(form_feild.subMenu)
      } else {
        subGroup = this.createFormControl(form_feild, subGroup)
      }
    })

    return new FormGroup(subGroup);
  }

  generateNestedForm(form: IMasterConfigForm[]) {
    let group: any = {}
    form.forEach((form_feild: any) => {
      if (form_feild.nested) {
        group[form_feild.control_name] = this.createFormGroup(form_feild.subMenu)
      } else {
        group = this.createFormControl(form_feild, group)
      }
    })
    return new FormGroup(group);

  }

  priceRangeValidator(form: any, data: any) {
    const minRange = form.get(data.data.min.control_name).value;
    const maxRange = form.get(data.data.max.control_name).value;

    if (minRange !== null && maxRange !== null && maxRange < minRange) {
      return { invalidRange: true };
    }
    return null;
  }

    generateFormControl(control_names: any, group_row: any) {
        let group: any = {}
        let current_month = new Date().getMonth();
        const validation = group_row.validation;
        let generatedForm: any;
        control_names.forEach((control_name: any, index:number) => {
            group[control_name] = new FormControl('', {
                validators: [
                    Validators.pattern(validation.pattern),
                    Validators.min(validation.min),
                    Validators.max(validation.max),
                    // this.variationValidator(control_names, control_name, group_row)
                ]
            })
            if(index >= current_month-1 && group_row.group_name != 'moveins'){
                group[control_name].addValidators(Validators.required);
            }
            if(index>=current_month && group_row.group_name === 'moveins'){
                group[control_name].addValidators(Validators.required);
            }
        })

        generatedForm = new FormGroup(group)
        return generatedForm;
    }

    variationValidator(control_names: any, control_name: string, group_row: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let current_control_value = control.value;
            let valid = true;
            let previous_control_name: string = '';
            if (!current_control_value) {
                return null;
            }
            if (
                group_row.group_name != 'rentGrowth'
                && group_row.group_name != 'occupiedUnits'
                && group_row.group_name != 'moveins'
            ) {
                control_names.forEach((name: any, index: number) => {
                    if (name === control_name) {
                        if (control_name != 'jan') {
                            previous_control_name = control_names[index - 1];
                        }
                        else {
                            previous_control_name = control_names[index + 1];
                        }
                    }
                })
                let previous_control_value = get(control.parent?.controls, previous_control_name);
                const difference = previous_control_value - current_control_value;
                if (Math.abs(difference) > 2) {
                    valid = false;
                }
            }
            else {
                valid = true
            }
            return !valid ? { variation: true } : null;
        }
    }

    checkBox(data: any) {
        let count: number = 0, mainCheck: boolean = false;
        data.forEach((el: any) => {
            if (el.class === 'selected') {
                count++;
            }
        })
        if (count === data.length) {
            mainCheck = true;
        }
        else {
            mainCheck = false;
        }
        return mainCheck;
    }

  onRangeChange(form: any, masterConfigForm: any) {
    let minRange = parseInt(
      masterConfigForm
        .get("revenue_config")
        .get(form.control_name)
        .get(form.subMenu[0].control_name).value
    );
    let maxRange = parseInt(masterConfigForm
      .get("revenue_config")
      .get(form.control_name)
      .get(form.subMenu[1].control_name).value
    );

    if (
      minRange !== null &&
      maxRange !== null &&
      maxRange < minRange
    ) {
      masterConfigForm
        .get("revenue_config")
        ?.get(form.control_name)
        .get(form.subMenu[0].control_name)
        ?.setErrors({ invalidRange: true });
      masterConfigForm
        .get("revenue_config")
        ?.get(form.control_name)
        .get(form.subMenu[1].control_name)
        ?.setErrors({ invalidRange: true });
    } else {
      masterConfigForm
        .get("revenue_config")
        ?.get(form.control_name)
        .get(form.subMenu[0].control_name)
        ?.setErrors({ invalidRange: null });
      masterConfigForm
        .get("revenue_config")
        ?.get(form.control_name)
        .get(form.subMenu[1].control_name)
        ?.setErrors({ invalidRange: null });
      masterConfigForm
        .get("revenue_config")
        ?.get(form.control_name)
        .get(form.subMenu[0].control_name)
        ?.updateValueAndValidity();
      masterConfigForm
        .get("revenue_config")
        ?.get(form.control_name)
        .get(form.subMenu[1].control_name)
        ?.updateValueAndValidity();
    }
  }
}