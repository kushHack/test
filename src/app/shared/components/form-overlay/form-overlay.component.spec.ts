import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOverlayComponent } from './form-overlay.component';

describe('FormOverlayComponent', () => {
  let component: FormOverlayComponent;
  let fixture: ComponentFixture<FormOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
