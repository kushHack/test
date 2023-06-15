import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerInsideComponent } from './spinner-inside.component';

describe('SpinnerInsideComponent', () => {
  let component: SpinnerInsideComponent;
  let fixture: ComponentFixture<SpinnerInsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerInsideComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
