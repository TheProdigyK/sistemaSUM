import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProcesoDialogComponent } from './nuevo-proceso-dialog.component';

describe('NuevoProcesoDialogComponent', () => {
  let component: NuevoProcesoDialogComponent;
  let fixture: ComponentFixture<NuevoProcesoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoProcesoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProcesoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
