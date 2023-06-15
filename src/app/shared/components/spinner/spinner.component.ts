import { Component } from '@angular/core';
import { SpinnerService } from '../../utils/spinner.utils';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  public loading: boolean = false;

  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.getEmittedValue().subscribe((element: any) => {
      this.loading = element;
    })
  }
}
