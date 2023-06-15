import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth-guard.guard';
import { TotalIncomeComponent } from './total-income/total-income.component';
import { MakeReadyComponent } from './makeReadyExpense/make-ready.component';
import { OtherIncomeComponent } from './otherIncome/other-income.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectionDashboardComponent } from './projection-dashboard.component';
import { RMComponent } from './repairAndMaintenance/RM.component';
import { TotalExpenseComponent } from './total-expense/total-expense.component';
import { RentalIncomeComponent } from './rental-income/rental.component';

const routes: Routes = [
  {
    path: '', component: ProjectionDashboardComponent,
    children: [
      { path: '', component: PortfolioComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'total-income', component: TotalIncomeComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'rental-income', component: RentalIncomeComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'other-income', component: OtherIncomeComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'total-expense', component: TotalExpenseComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'make-ready', component: MakeReadyComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'repair-maintenance', component: RMComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectionRoutingModule { }
