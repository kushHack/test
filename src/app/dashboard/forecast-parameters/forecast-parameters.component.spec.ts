import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastParametersComponent } from './forecast-parameters.component';

describe('ForecastParametersComponent', () => {
  let component: ForecastParametersComponent;
  let fixture: ComponentFixture<ForecastParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
