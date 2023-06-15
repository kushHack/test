import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeReadyComponent } from './make-ready.component';

describe('MakeReadyComponent', () => {
  let component: MakeReadyComponent;
  let fixture: ComponentFixture<MakeReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeReadyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
