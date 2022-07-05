import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRowDialogComponent } from './remove-row-dialog.component';

describe('RemoveRowDialogComponent', () => {
  let component: RemoveRowDialogComponent;
  let fixture: ComponentFixture<RemoveRowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveRowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveRowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
