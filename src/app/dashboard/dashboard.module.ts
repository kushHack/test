import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ExportReportComponent } from './export-reports/export-reports.component';
import { SharedModule } from '../shared/modules/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ExportReportComponent,
    SidenavComponent,
    BodyComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
