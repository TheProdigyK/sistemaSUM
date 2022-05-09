import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavClosedComponent } from './side-nav-closed.component';

describe('SideNavClosedComponent', () => {
  let component: SideNavClosedComponent;
  let fixture: ComponentFixture<SideNavClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavClosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
