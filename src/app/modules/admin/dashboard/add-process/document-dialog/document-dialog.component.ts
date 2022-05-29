import { DocumentoService } from './../../../../../services/documento.service';
import { TipoDocumento } from './../../../../../models/tipo_documento';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface documentoDialog{
  archivo?: File,
  tipo?: string,
  id_tipo?: number  
}

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})



export class DocumentDialogComponent implements OnInit {

  selectedTipoDocumento = new FormControl('', Validators.required);
  name_doc = new FormControl('', Validators.required);
  uploadFiles!: Array<File>

  TipoDocumentos!: TipoDocumento[]



  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    private documentService: DocumentoService
  ) { }

  ngOnInit(): void {
    this.typeDocuments()
  }

  
  onFileChange(e:any){
    this.uploadFiles = e.target.files;
    console.log(this.uploadFiles[0].name)
    this.name_doc.setValue(this.uploadFiles[0].name)

  }

  onUploadFile(){
    let tipodocumento_data!:TipoDocumento
    this.TipoDocumentos.forEach(x =>{
      if(x.nombre == this.selectedTipoDocumento.value){
        tipodocumento_data = x
        return
      }

    })
    let archivo: documentoDialog = {
      archivo: this.uploadFiles[0],
      tipo: tipodocumento_data.nombre,
      id_tipo: tipodocumento_data.id_tipo_documento
    }
    this.dialogRef.close({event:"add",data:archivo})
  }

  onCancel(){
    this.dialogRef.close({event:"cancel"});
  }

  //GET TYPE DOCUMENTS
  typeDocuments(){
  this.documentService.getTipoDocumento().subscribe(
    data =>{
      this.TipoDocumentos = data
    }
  )
}

}
