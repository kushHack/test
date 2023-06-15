import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MasterDataRoutingModule } from './master-routing.module';
import { MasterDataSetupComponent } from './master-data-setup.component';
import { CommunityComponent } from './community/community.component';
import { CommunityFormComponent } from './community/community-form/community-form.component';
import { ActualBudgetComponent } from './actual-budget/actual-budget.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { StaticFileUploadComponent } from './static-file-upload/static-file.component';

@NgModule({
  declarations: [
    MasterDataSetupComponent,
    CommunityComponent,
    CommunityFormComponent,
    ActualBudgetComponent,
    ConfigurationComponent,
    StaticFileUploadComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    SharedModule
  ]
})
export class MasterDataModule { }
