import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcessDialogComponent } from './edit-process-dialog.component';

describe('EditProcessDialogComponent', () => {
  let component: EditProcessDialogComponent;
  let fixture: ComponentFixture<EditProcessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProcessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProcessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
