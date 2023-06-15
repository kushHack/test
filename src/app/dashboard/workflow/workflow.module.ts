import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { InitiateWorkflowComponent } from './initiate-workflow/initiate-workflow.component';
import { TaskQueueComponent } from './task-queue/task-queue.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    WorkflowComponent,
    InitiateWorkflowComponent,
    TaskQueueComponent
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    SharedModule
  ]
})
export class WorkflowModule { }
