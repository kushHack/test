import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportReportComponent } from './export-reports.component';

describe('ExportReportComponent', () => {
  let component: ExportReportComponent;
  let fixture: ComponentFixture<ExportReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
