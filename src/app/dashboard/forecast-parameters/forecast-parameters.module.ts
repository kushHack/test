import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastParametersRoutingModule } from './forecast-parameters-routing.module';
import { ForecastParametersComponent } from './forecast-parameters.component';
import { RevenueInputComponent } from './revenue-input/revenue-input.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PreviewComponent } from './preview-data/preview.component';

@NgModule({
  declarations: [
    ForecastParametersComponent,
    RevenueInputComponent,
    IncomeComponent,
    ExpenseComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    ForecastParametersRoutingModule,
    SharedModule
  ]
})
export class ForecastParametersModule { }
