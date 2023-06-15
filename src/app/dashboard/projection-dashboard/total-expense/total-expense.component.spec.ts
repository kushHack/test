import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIncomeComponent } from './total-expense.component';

describe('TotalIncomeComponent', () => {
  let component: TotalIncomeComponent;
  let fixture: ComponentFixture<TotalIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
