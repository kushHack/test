import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { departmentOptions, masterTable } from 'src/app/shared/config/master.table';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-static-file',
  templateUrl: './static-file.component.html',
  styleUrls: ['./static-file.component.scss']
})

export class StaticFileUploadComponent implements OnInit {
  public heading: string = 'Master Data Setup: Static File Upload';
  public table = masterTable;
  public departments = departmentOptions;
  public filename: string = '';
  public mainCheck: boolean = false;

  constructor(
    private title: Title,
    private spinner: SpinnerService) {
    this.title.setTitle('Static File Upload')
  }

  uploadForm = new FormGroup({
    department: new FormControl('', {
      validators: [Validators.required],
    }),
    file_type: new FormControl('', {
      validators: [Validators.required],
    }),
    year: new FormControl('2022', {
      validators: [Validators.required],
    }),
    file: new FormControl('', {
      validators: [Validators.required],
    })
  })

  get department() {
    return this.uploadForm.get('department');
  }
  get file_type() {
    return this.uploadForm.get('file_type');
  }
  get year() {
    return this.uploadForm.get('year');
  }
  get file() {
    return this.uploadForm.get('file');
  }

  ngOnInit(): void {
    this.spinner.change(false);
    this.table.dataRows.forEach((el: any) => {
      if (el.file_name) {
        el.disabled = true;
      }
    })
  }

  changeFile(path: string, event: any) {
    const pathArray = path.split("\\")
    this.filename = pathArray[pathArray.length - 1];
  }

  selectRows(event: any, i: number) {
    if (event.target.checked) {
      this.table.dataRows[i].class = 'selected';
    }
    else {
      this.table.dataRows[i].class = '';
    }
    let count: number = 0, length: number = 0;
    this.table.dataRows.forEach((el: any) => {
      if (el.class === 'selected') {
        count++;
      }
      if (!el.disabled) {
        length++;
      }
    })
    if (count === length) {
      this.mainCheck = true;
    }
    else {
      this.mainCheck = false;
    }
  }

  selectAll(event: any) {
    this.mainCheck = event.target.checked;
    this.table.dataRows.forEach((el: any) => {
      if (this.mainCheck) {
        if (!el.disabled) {
          el.class = 'selected';
        }
      }
      else {
        el.class = '';
      }
    })
  }

  onSave(data: any) {
    if (this.uploadForm.invalid) {
      return
    }
  }

  ngOnDestroy(): void {
    this.mainCheck = false;
    this.table.dataRows.forEach((el: any) => {
      el.class = '';
    })
  }


}
