import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMComponent } from './RM.component';

describe('RMComponent', () => {
  let component: RMComponent;
  let fixture: ComponentFixture<RMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
