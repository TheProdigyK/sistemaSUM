import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../../material/angular-materia.module';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './layout/side-nav-left/side-nav/side-nav.component';
import { SideNavClosedComponent } from './layout/side-nav-left/side-nav-closed/side-nav-closed.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { ActiveProcessComponent } from './dashboard/active-process/active-process.component';
import { NewProcessDialogComponent } from './dashboard/active-process/new-process-dialog/new-process-dialog.component';
import { EditProcessDialogComponent } from './dashboard/active-process/edit-process-dialog/edit-process-dialog.component';
import { ArchivedProcessComponent } from './dashboard/archived-process/archived-process/archived-process.component';
import { ViewProcessComponent } from './dashboard/view-process/view-process.component'




@NgModule({
  declarations: [
    ActiveProcessComponent,
    NewProcessDialogComponent,
    EditProcessDialogComponent,
    ArchivedProcessComponent,
    LayoutComponent,
    SideNavComponent,
    SideNavClosedComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
