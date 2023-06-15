import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticFileUploadComponent } from './static-file.component';

describe('StaticFileUploadComponent', () => {
  let component: StaticFileUploadComponent;
  let fixture: ComponentFixture<StaticFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
