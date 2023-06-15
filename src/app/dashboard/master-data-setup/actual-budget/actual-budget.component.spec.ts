import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualBudgetComponent } from './actual-budget.component';

describe('ActualBudgetComponent', () => {
  let component: ActualBudgetComponent;
  let fixture: ComponentFixture<ActualBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
