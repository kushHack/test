import { Component } from '@angular/core';
import { SpinnerService } from '../../utils/spinner.utils';

@Component({
  selector: 'app-spinner-inside',
  templateUrl: './spinner-inside.component.html',
  styleUrls: ['./spinner-inside.component.scss']
})
export class SpinnerInsideComponent {

  public loading: boolean = false;

  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.spinner.getSpinner2().subscribe((element: any) => {
      this.loading = element;
    })
  }
}
