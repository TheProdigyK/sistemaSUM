import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ActiveProcessComponent } from './active-process/active-process.component';
import { StatComponent } from './stat/stat.component';
import {AngularMaterialModule} from '../../../material/angular-materia.module';
import { NewProcessDialogComponent } from './active-process/new-process-dialog/new-process-dialog.component';
import { EditProcessDialogComponent } from './active-process/edit-process-dialog/edit-process-dialog.component'

@NgModule({
  declarations: [
    ActiveProcessComponent,
    StatComponent,
    NewProcessDialogComponent,
    EditProcessDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }