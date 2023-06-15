import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth-guard.guard';
import { DashboardComponent } from './dashboard.component';
import { ExportReportComponent } from './export-reports/export-reports.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      // { path: 'master-data-setup', component: MasterDataSetupComponent, canActivate: [AuthGuard], data: { role: 'DA' } },
      {
        path: 'master-data-setup',
        loadChildren: () => import("./master-data-setup/master-data.module")
          .then(m => m.MasterDataModule)
      },
      {
        path: 'projection-dashboard',
        loadChildren: () => import("./projection-dashboard/projection.module")
          .then(m => m.ProjectionModule)
      },
      {
        path: 'forecast',
        loadChildren: () => import("./forecast-parameters/forecast-parameters.module")
          .then(m => m.ForecastParametersModule)
      },
      {
        path: 'workflow',
        loadChildren: () => import("./workflow/workflow.module")
          .then(m => m.WorkflowModule)
      },
      { path: 'export-reports', component: ExportReportComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
