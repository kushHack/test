import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SpinnerService } from '../../utils/spinner.utils';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
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

export class AlertBoxComponent {

  public message: string = '';
  public background_class: string = '';
  public hidden: boolean = false;

  constructor(private spinner: SpinnerService) { }

  closeAlert() {
    this.hidden = false
  }

  ngOnInit(): void {
    this.spinner.getEmittedText().subscribe((element: any) => {
      this.message = element.value;
      this.hidden = true;
      this.background_class = element.type;
      setTimeout(() => {
        this.hidden = false
      }, 4000)
    })
  }

}
