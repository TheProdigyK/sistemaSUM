import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedDialogComponent } from './archived-dialog.component';

describe('ArchivedDialogComponent', () => {
  let component: ArchivedDialogComponent;
  let fixture: ComponentFixture<ArchivedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
