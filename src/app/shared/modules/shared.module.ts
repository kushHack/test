import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumComponent } from '../components/breadcrum/breadcrum.component';
import { FormOverlayComponent } from '../components/form-overlay/form-overlay.component';
import { FormSubmitComponent } from '../components/form-submit/form-submit.component';
import { ClickedOutsideDirective } from '../directives/click-outside.directive';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { AlertBoxComponent } from '../components/alert-box/alert-box.component';
import { SearchPipe } from '../pipes/search.pipe';
import { SpinnerInsideComponent } from '../components/spinner-inside/spinner-inside.component';
import { DashSummaryComponent } from '../components/dashboard-summary/summary.component';
import { BarLineChartComponent } from 'src/app/dashboard/charts/bar-line-chart/bar-line-chart.component';
import { SingleBarLineComponent } from 'src/app/dashboard/charts/single-bar-line/single-bar-line.component';
import { BarLineTwoChartComponent } from 'src/app/dashboard/charts/bar-line-2/bar-line-2.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';

@NgModule({
    declarations: [
        BreadcrumComponent,
        FormOverlayComponent,
        FormSubmitComponent,
        ClickedOutsideDirective,
        SpinnerComponent,
        DashSummaryComponent,
        AlertBoxComponent,
        SpinnerInsideComponent,
        BarLineChartComponent,
        SingleBarLineComponent,
        BarLineTwoChartComponent,
        SearchPipe,
        PaginationComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        BreadcrumComponent,
        FormOverlayComponent,
        SpinnerComponent,
        SpinnerInsideComponent,
        AlertBoxComponent,
        FormSubmitComponent,
        DashSummaryComponent,
        ClickedOutsideDirective,
        BarLineChartComponent,
        BarLineTwoChartComponent,
        SingleBarLineComponent,
        SearchPipe,
        PaginationComponent,
        ConfirmationComponent
    ],
})
export class SharedModule { }