import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumariadoCrearDialogComponent } from './sumariado-crear-dialog.component';

describe('SumariadoCrearDialogComponent', () => {
  let component: SumariadoCrearDialogComponent;
  let fixture: ComponentFixture<SumariadoCrearDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumariadoCrearDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumariadoCrearDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
