import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ProjectionRoutingModule } from './projection-routing.module';
import { ProjectionDashboardComponent } from './projection-dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { OtherIncomeComponent } from './otherIncome/other-income.component';
import { MakeReadyComponent } from './makeReadyExpense/make-ready.component';
import { RMComponent } from './repairAndMaintenance/RM.component';
import { TotalIncomeComponent } from './total-income/total-income.component';
import { TotalExpenseComponent } from './total-expense/total-expense.component';
import { RentalIncomeComponent } from './rental-income/rental.component';

@NgModule({
  declarations: [
    ProjectionDashboardComponent,
    PortfolioComponent,
    OtherIncomeComponent,
    TotalIncomeComponent,
    RentalIncomeComponent,
    TotalExpenseComponent,
    MakeReadyComponent,
    RMComponent,
  ],
  imports: [
    CommonModule,
    ProjectionRoutingModule,
    SharedModule
  ]
})
export class ProjectionModule { }
