import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataSetupComponent } from './master-data-setup.component';

describe('MasterDataSetupComponent', () => {
  let component: MasterDataSetupComponent;
  let fixture: ComponentFixture<MasterDataSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDataSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
