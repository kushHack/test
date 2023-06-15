import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateWorkflowComponent } from './initiate-workflow.component';

describe('InitiateWorkflowComponent', () => {
  let component: InitiateWorkflowComponent;
  let fixture: ComponentFixture<InitiateWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
