import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueInputComponent } from './revenue-input.component';

describe('RevenueInputComponent', () => {
  let component: RevenueInputComponent;
  let fixture: ComponentFixture<RevenueInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
