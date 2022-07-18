import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumariadoDescargosDialogComponent } from './sumariado-descargos-dialog.component';

describe('SumariadoDescargosDialogComponent', () => {
  let component: SumariadoDescargosDialogComponent;
  let fixture: ComponentFixture<SumariadoDescargosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumariadoDescargosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumariadoDescargosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
