import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth-guard.guard';
import { ExpenseComponent } from './expense/expense.component';
import { ForecastParametersComponent } from './forecast-parameters.component';
import { IncomeComponent } from './income/income.component';
import { PreviewComponent } from './preview-data/preview.component';
import { RevenueInputComponent } from './revenue-input/revenue-input.component';

const routes: Routes = [
  {
    path: '', component: ForecastParametersComponent,
    children: [
      { path: 'revenue-input', component: RevenueInputComponent, canActivate: [AuthGuard], data: { role: ['RA', 'RPM'] } },
      { path: 'income', component: IncomeComponent, canActivate: [AuthGuard], data: { role: ['RA', 'RPM'] } },
      { path: 'expense', component: ExpenseComponent, canActivate: [AuthGuard], data: { role: ['RA', 'RPM'] } },
      { path: 'revenue-input/preview-data', component: PreviewComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'income/preview-data', component: PreviewComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } },
      { path: 'expense/preview-data', component: PreviewComponent, canActivate: [AuthGuard], data: { role: ['RPM', 'RA'] } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastParametersRoutingModule { }
