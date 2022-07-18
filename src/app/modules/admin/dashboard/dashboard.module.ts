import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ActiveProcessComponent } from './active-process/active-process.component';
import { SumariadoDialogComponent } from './add-process/sumariado-dialog/sumariado-dialog.component';
import { DocumentDialogComponent } from './add-process/document-dialog/document-dialog.component';
import { NuevoProcesoDialogComponent } from './active-process/nuevo-proceso-dialog/nuevo-proceso-dialog.component';
import { AddProcessComponent } from './add-process/add-process.component';
import { AngularMaterialModule } from 'src/app/material/angular-materia.module';
import { ArchivarProcesoDialogComponent } from './active-process/archivar-proceso-dialog/archivar-proceso-dialog.component';
import { GenerateUrlComponent } from './generate-url/generate-url.component';
import { UrlDialogComponent } from './generate-url/url-dialog/url-dialog.component';



@NgModule({
  declarations: [
    // ActiveProcessComponent,
    // NewProcessDialogComponent,
    // NuevoProcesoDialogComponent,
    // EditProcessDialogComponent,
    // ArchivedProcessComponent,
    // AddProcessComponent,
    // SumariadoDialogComponent,
    // DocumentDialogComponent  
    // ArchivarProcesoDialogComponent
  
    // GenerateUrlComponent
  
    // UrlDialogComponent
  
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }
