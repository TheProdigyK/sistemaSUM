import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSisCorrespondenciaDialogComponent } from './doc-sis-correspondencia-dialog.component';

describe('DocSisCorrespondenciaDialogComponent', () => {
  let component: DocSisCorrespondenciaDialogComponent;
  let fixture: ComponentFixture<DocSisCorrespondenciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocSisCorrespondenciaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSisCorrespondenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
