import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumariadoDialogComponent } from './sumariado-dialog.component';

describe('SumariadoDialogComponent', () => {
  let component: SumariadoDialogComponent;
  let fixture: ComponentFixture<SumariadoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumariadoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumariadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
