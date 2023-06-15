import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSummaryComponent } from './summary.component';

describe('DashSummaryComponent', () => {
  let component: DashSummaryComponent;
  let fixture: ComponentFixture<DashSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
