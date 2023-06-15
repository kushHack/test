import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBarLineComponent } from './single-bar-line.component';

describe('SingleBarLineComponent', () => {
  let component: SingleBarLineComponent;
  let fixture: ComponentFixture<SingleBarLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBarLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
