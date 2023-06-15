import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalIncomeComponent } from './rental.component';

describe('RentalIncomeComponent', () => {
  let component: RentalIncomeComponent;
  let fixture: ComponentFixture<RentalIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
