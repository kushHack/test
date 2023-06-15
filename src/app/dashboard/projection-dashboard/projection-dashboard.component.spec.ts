import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionDashboardComponent } from './projection-dashboard.component';

describe('ProjectionDashboardComponent', () => {
  let component: ProjectionDashboardComponent;
  let fixture: ComponentFixture<ProjectionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
