import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth-guard.guard';
import { ActualBudgetComponent } from './actual-budget/actual-budget.component';
import { CommunityComponent } from './community/community.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MasterDataSetupComponent } from './master-data-setup.component';
import { StaticFileUploadComponent } from './static-file-upload/static-file.component';

const routes: Routes = [
  {
    path: '', component: MasterDataSetupComponent,
    children: [
      { path: 'static-file-upload', component: StaticFileUploadComponent, canActivate: [AuthGuard], data: { role: ['DA'] } },
      { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard], data: { role: ['DA'] } },
      { path: 'communities', component: CommunityComponent, canActivate: [AuthGuard], data: { role: ['DA'] } },
      { path: 'actual-budget', component: ActualBudgetComponent, canActivate: [AuthGuard], data: { role: ['DA'] } },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
