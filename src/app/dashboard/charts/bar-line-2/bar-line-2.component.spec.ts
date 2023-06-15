import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLineTwoChartComponent } from './bar-line-2.component';

describe('BarLineTwoChartComponent', () => {
  let component: BarLineTwoChartComponent;
  let fixture: ComponentFixture<BarLineTwoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarLineTwoChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarLineTwoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
