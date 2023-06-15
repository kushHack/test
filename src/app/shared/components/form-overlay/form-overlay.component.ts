import { animate, style, transition, trigger } from '@angular/animations';
import { Conditional } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { formOverlayTable } from '../../config/form-overlay.table';
import { WorkflowService } from '../../services/workflow.service';
import { FormService } from '../../utils/forms.utils';

@Component({
  selector: 'app-form-overlay',
  templateUrl: './form-overlay.component.html',
  styleUrls: ['./form-overlay.component.scss'],
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
export class FormOverlayComponent {

  @Input() heading: string = '';
  @Input() form: any;
  @Input() data: any;

  public loading: boolean = false;
  table = formOverlayTable;

  constructor(private formService: FormService, private workflowService: WorkflowService) { }

  closeOverlay() {
    this.formService.changeOverlay(false);
  }

  ngOnInit(): void {
    this.formService.getOverlayEmittedValue().subscribe((element: any) => {
      this.loading = element;
    })
  }

}
