import { DocumentoService } from './../../../../../services/documento.service';
import { Documento } from './../../../../../models/documento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentoSISDOC } from 'src/app/models/documentoSISDOC';
import { documentoDialog } from '../document-dialog/document-dialog.component';

export interface DocumentoElement {
  nro_correspondencia: number;
  nombre: string;
  fecha_registro: string;
}

const ELEMENT_DATA: Documento[] = [
  {n_correspondencia: '1', nombre: 'Documento #1', fecha_registro: new Date()},
  {n_correspondencia: '11', nombre: 'Documento #12', fecha_registro: new Date()},
  {n_correspondencia: '12', nombre: 'Documento #13', fecha_registro: new Date()},
  {n_correspondencia: '13', nombre: 'Documento #14', fecha_registro: new Date()},
  {n_correspondencia: '14', nombre: 'Documento #15', fecha_registro: new Date()},
  {n_correspondencia: '15', nombre: 'Documento #16', fecha_registro: new Date()},
];

@Component({
  selector: 'app-doc-sis-correspondencia-dialog',
  templateUrl: './doc-sis-correspondencia-dialog.component.html',
  styleUrls: ['./doc-sis-correspondencia-dialog.component.scss']
})
export class DocSisCorrespondenciaDialogComponent implements OnInit {

  queryNroCorrespondencia = new FormControl('', Validators.required);

  isLoading = false;

  documentoColumns: string[] = ['select', 'nrocorres', 'docreg_cite', 'docreg_referencia', 'actions'];
  dataDocumento!: MatTableDataSource<DocumentoSISDOC>;
  documentoSelection = new SelectionModel<DocumentoSISDOC>(true, []);
  @ViewChild(MatPaginator) documentoPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DocSisCorrespondenciaDialogComponent>,
    private documentoServices: DocumentoService
  ) { }

  ngOnInit(): void {
  }

  //SELECCIONAR UN SOLO DOCUMENTO (CHECKBOX METODO)
  selectHandler(row: DocumentoSISDOC) {
    if (!this.documentoSelection.isSelected(row)) {
      this.documentoSelection.clear();
    }
    this.documentoSelection.toggle(row);
    //console.log(row)

  }

  //VER DOCUMENTO (BOTON TABLA)
  viewDocumento(row:DocumentoSISDOC){    
    if(row.documento){
      window.open(row.documento)
    }
    

  }

  /*
    BUTTONS VISTA
  */

  searchDocumento(){

    this.isLoading = true;
    this.documentoServices.getDocumentosSISDOC(this.queryNroCorrespondencia.value).subscribe(data =>{
      this.dataDocumento = new MatTableDataSource(data)
      this.dataDocumento.paginator = this.documentoPaginator;
      this.dataDocumento.sort = this.sort;
      this.isLoading = false;
    })

  }

  onCancel(){
    this.dialogRef.close({event:"cancel"});
  }

  onConfirm(){
    this.dialogRef.close({event:"add", data:this.documentoSelection.selected[0]})
  }

}
