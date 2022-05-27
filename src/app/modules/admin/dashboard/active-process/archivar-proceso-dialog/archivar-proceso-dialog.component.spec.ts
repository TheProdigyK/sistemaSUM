import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivarProcesoDialogComponent } from './archivar-proceso-dialog.component';

describe('ArchivarProcesoDialogComponent', () => {
  let component: ArchivarProcesoDialogComponent;
  let fixture: ComponentFixture<ArchivarProcesoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivarProcesoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivarProcesoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
