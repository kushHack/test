import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth-guard.guard';
import { InitiateWorkflowComponent } from './initiate-workflow/initiate-workflow.component';
import { TaskQueueComponent } from './task-queue/task-queue.component';
import { WorkflowComponent } from './workflow.component';

const routes: Routes = [
  {
    path: '', component: WorkflowComponent,
    children: [
      { path: 'initiate-workflow', component: InitiateWorkflowComponent, data: { role: ['RA'] }, canActivate: [AuthGuard] },
      { path: 'task-queue', component: TaskQueueComponent, data: { role: ['RPM', 'RA'] }, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
