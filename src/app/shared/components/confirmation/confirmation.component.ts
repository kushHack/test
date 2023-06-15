import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
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
export class ConfirmationComponent implements OnInit {

  @Output() confirm = new EventEmitter();

  constructor(private confirmationService: ConfirmationService, private workflowService: WorkflowService) { }

  closePopUp() {
    this.confirmationService.active.next(false)
  }
  finalize() {
    this.confirm.emit()
   }
  ngOnInit(): void {
  }

}
