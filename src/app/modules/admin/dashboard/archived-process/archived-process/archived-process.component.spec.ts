import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProcessComponent } from './archived-process.component';

describe('ArchivedProcessComponent', () => {
  let component: ArchivedProcessComponent;
  let fixture: ComponentFixture<ArchivedProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
