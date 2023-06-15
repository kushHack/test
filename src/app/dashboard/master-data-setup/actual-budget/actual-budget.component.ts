import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-actual-budget',
  templateUrl: './actual-budget.component.html',
  styleUrls: ['./actual-budget.component.scss']
})

export class ActualBudgetComponent implements OnInit {
  heading: string = 'Master Data Detup: Community Sheets Upload';

  constructor(
    private title: Title,
    private spinner: SpinnerService) {
    this.title.setTitle('Community Sheets Upload')
  }

  ngOnInit(): void {
  }

}
