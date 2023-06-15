import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { navTabsTask, taskQueueTable } from 'src/app/shared/config/task-queue.table';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { FormService } from 'src/app/shared/utils/forms.utils';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';
import { EmailService } from 'src/app/shared/services/email.service';
import { ConfirmationService } from 'src/app/shared/components/confirmation/confirmation.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-task-queue',
  templateUrl: './task-queue.component.html',
  styleUrls: ['./task-queue.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms',
          style({ opacity: 1 })
        )
      ])
    ])
  ]
})

export class TaskQueueComponent implements OnInit {
  heading: string = 'Task Queue';
  table: any = taskQueueTable;
  table_headings: string[] = [];
  userRole: string = '';
  userEmail: string = '';
  userName: string = '';
  mainCheck: boolean = false;
  endDays: number = 0
  navTabs = navTabsTask;
  active$ = this.confirmationService.active
  selectedIndex: number = 1;
  finalWorkflows: any
  currWorkFlow: any;
  constructor(
    private title: Title,
    private formService: FormService,
    private authService: AuthService,
    private workflowService: WorkflowService,
    private masterDataService: MasterDataService,
    private spinner: SpinnerService,
    private emailService: EmailService,
    private confirmationService: ConfirmationService) {
    this.title.setTitle('Task Queue')
  }

  ngOnInit(): void {
    // this.spinner.change(false);
    this.userRole = this.authService.getUser('role');
    this.userName = this.authService.getUser('name');
    this.userEmail = this.authService.getUser('email');
    this.heading = `${this.heading} : ${this.userName}`;
    this._getMasterConfig();
    // this.heading = `${this.heading} : ${userName.split(' ')[0]}`
    if (this.userRole === 'RPM') {
      this.table_headings = this.table.headers_rpm;
      this.getWorkflowRPM();
    }
    if (this.userRole === 'RA') {
      this.table_headings = this.table.headers_admin;
      this.getAllWorkflow();
    }
    this.spinner.change(false);
  }

  getWorkflowRPM() {
    this.workflowService.getWorkflowByRPM(this.userEmail)
      .subscribe(res => {
        this.table.dataRows = res.data;
        this.finalWorkflows = this.table.dataRows.filter((dataRow: any) => {
          return dataRow.isFinal
        })
      })
  }

  getAllWorkflow() {
    this.workflowService.getAllWorkflow()
      .subscribe(res => {
        this.table.dataRows = res.data;
        this.finalWorkflows = this.table.dataRows.filter((dataRow: any) => {
          return dataRow.isFinal
        })
      })

  }

  finalize() {
    this.workflowService.finalizeWorkflow(this.currWorkFlow,this.finalWorkflows[0]).subscribe({
      next:(res)=>{
        if(res.status === 200){
          this.getWorkflowRPM()
        }
      }
    })
    this.confirmationService.active.next(false)

  }

  _getMasterConfig() {
    this.masterDataService.getMasterConfig()
      .subscribe((res: any) => {
        this.endDays = res.data.workflow_life_cycle;
      })
  }

  startWorkflow(data: any) {
    this.workflowService.startWorkflow(data);
  }

  toggleTabs(index: number) {
    this.navTabs.forEach((el: any, i: number) => {
      el.class = '';
      if (i == index) {
        el.class = 'active';
      }
    })
    this.selectedIndex = index + 1;
  }

  reviewWorkflow(data: any) {
    Object.assign(data, {review: this.userEmail, reviewerName: this.userName})
    this.workflowService.reviewWorkflow(data);
  }

  approveWorkflow(data: any) {
    this.workflowService.approveWorkflow(data)
      .subscribe(res => {
        if (res.code === 200) {
          this.spinner.showAlert(res.message, 'success');
          this.getAllWorkflow();
        }
        else {
          this.spinner.showAlert(res.message, 'error');
        }
      })
  }

  sendMail(workflow:any){
    let message=``;
    if(this.userRole==='RA'){
      this.emailService.remindRpm(workflow._id);
      message = `Reminder Email has been sent to ${workflow.rpmName} for community: ${workflow.communityName}`;
    }
    if(this.userRole==='RPM'){
      this.emailService.remindAdmin(workflow._id);
      message = `Reminder Email has been sent to Admin for Review`;
    }
    this.spinner.showAlert(message,'success');
  }

  openConfirmation(workflow: any) {
    this.currWorkFlow = workflow
    this.confirmationService.active.next(true)
  }

  endDateCalc(date: any) {
    let result = new Date(date);
    result.setDate(result.getDate() + this.endDays);
    return result;
  }

  sendForReview(data: any) {
    this.workflowService.sendForReviewWorkflow(data)
      .subscribe(res => {
        if (res.code === 200) {
          this.workflowService.getWorkflowByRPM(this.userEmail)
            .subscribe(res => {
              this.table.dataRows = res.data;
            })
          this.spinner.change(false);
          this.spinner.showAlert(res.message, 'success');
        }
        if (res.code === 401) {
          this.spinner.change(false);
          this.spinner.showAlert(res.message, 'error');
        }
      })
  }

  ngOnDestroy(): void {
    this.mainCheck = false;
    this.table.dataRows.forEach((el: any) => {
      el.class = '';
    })
  }

}