import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../../material/angular-materia.module';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './layout/side-nav-left/side-nav/side-nav.component';
import { SideNavClosedComponent } from './layout/side-nav-left/side-nav-closed/side-nav-closed.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { ActiveProcessComponent } from './dashboard/active-process/active-process.component';
import { ArchivedProcessComponent } from './dashboard/archived-process/archived-process.component';
import { ViewProcessComponent } from './dashboard/view-process/view-process.component'
import { AddProcessComponent } from './dashboard/add-process/add-process.component';
import { SumariadoDialogComponent } from './dashboard/add-process/sumariado-dialog/sumariado-dialog.component';
import { DocumentDialogComponent } from './dashboard/add-process/document-dialog/document-dialog.component';
import { NuevoProcesoDialogComponent } from './dashboard/active-process/nuevo-proceso-dialog/nuevo-proceso-dialog.component';
import { ArchivarProcesoDialogComponent } from './dashboard/active-process/archivar-proceso-dialog/archivar-proceso-dialog.component';
import { GenerateUrlComponent } from './dashboard/generate-url/generate-url.component';
import { UrlDialogComponent } from './dashboard/generate-url/url-dialog/url-dialog.component';
import { DocSisCorrespondenciaDialogComponent } from './dashboard/add-process/doc-sis-correspondencia-dialog/doc-sis-correspondencia-dialog.component';
import { SumariadoCrearDialogComponent } from './dashboard/add-process/sumariado-crear-dialog/sumariado-crear-dialog.component';
import { ViewDocumentsDialogComponent } from './dashboard/view-process/view-documents-dialog/view-documents-dialog.component';
import { RemoveRowDialogComponent } from './dashboard/add-process/remove-row-dialog/remove-row-dialog.component';
import { ArchivedDialogComponent } from './dashboard/archived-process/archived-dialog/archived-dialog.component';
import { SumariadoDescargosDialogComponent } from './dashboard/add-process/sumariado-descargos-dialog/sumariado-descargos-dialog.component';

@NgModule({
  declarations: [
    ActiveProcessComponent,
    NuevoProcesoDialogComponent,
    ArchivarProcesoDialogComponent,
    ArchivedProcessComponent,
    AddProcessComponent,
    SumariadoDialogComponent,
    DocumentDialogComponent,
    ViewProcessComponent,
    GenerateUrlComponent,
    UrlDialogComponent,
    LayoutComponent,
    SideNavComponent,
    SideNavClosedComponent,
    TopNavComponent,
    DocSisCorrespondenciaDialogComponent,
    SumariadoCrearDialogComponent,
    RemoveRowDialogComponent,
    ViewDocumentsDialogComponent,
    ArchivedDialogComponent,
    SumariadoDescargosDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
