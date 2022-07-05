import { DocumentoService } from './../../../../../services/documento.service';
import { Proceso } from 'src/app/models/proceso';
import { Documento } from './../../../../../models/documento';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-documents-dialog',
  templateUrl: './view-documents-dialog.component.html',
  styleUrls: ['./view-documents-dialog.component.scss']
})
export class ViewDocumentsDialogComponent implements OnInit {

  
  documentoColumns: string[] = ['n_correspondencia', 'n_cite', 'nombre', 'referencia', 'actions'];
  dataDocumento!: MatTableDataSource<Documento>;
  @ViewChild(MatPaginator) documentoPaginator!: MatPaginator;
  @ViewChild(MatSort) sortdocumento!: MatSort;

  sumariado!:User
  proceso!:Proceso

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog_data: any,
    public dialogRef: MatDialogRef<ViewDocumentsDialogComponent>,
    private documentoService: DocumentoService
  ) { }

  ngOnInit(): void {
    this.sumariado = this.dialog_data['sumariado']
    this.proceso = this.dialog_data['procesoSeleccionado']
    this.cargarDocumentos()
  }

  obtenerPDF(row:Documento){
    window.open('https://documentalprueba.gestora.bo/wfdocs/workflow/2022/INTERNA/GNS/ever-ramirez/5190-8-157-22_28062022_102807_1_FIRMADO.pdf')

  }

  cargarDocumentos(){
    this.documentoService.getDocumentsSumariado(this.sumariado.id_usuario!, this.proceso.id_proceso!).subscribe(
      doc =>{
        this.dataDocumento = new MatTableDataSource(doc)
        this.dataDocumento.paginator = this.documentoPaginator;
        this.dataDocumento.sort = this.sortdocumento;

    })
  }

  onTerminate(){
    this.dialogRef.close({event:"return"});
  }

}
