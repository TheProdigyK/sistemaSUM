import { DocumentoService } from './../../../../../services/documento.service';
import { Documento } from './../../../../../models/documento';
import { Sumariado } from './../../../../../models/sumariado';
import { ProcesadoService } from 'src/app/services/procesado.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-row-dialog',
  templateUrl: './remove-row-dialog.component.html',
  styleUrls: ['./remove-row-dialog.component.scss']
})
export class RemoveRowDialogComponent implements OnInit {

  title:string =''
  item:string = ''

  sumariado!:Sumariado
  documento!:Documento

  proceso:String = ''

  constructor(
    public dialogRef: MatDialogRef<RemoveRowDialogComponent>,
    private procesadoService: ProcesadoService,
    private documentoService: DocumentoService,
    @Inject(MAT_DIALOG_DATA) public dialog_data: any

  ) { }

  ngOnInit(): void {
    this.title = this.dialog_data['nombreItem']
    this.proceso = this.dialog_data['id_proceso']
    if(this.title == 'SUMARIADO'){
      this.sumariado = this.dialog_data['sumariadoSeleccionado']
      this.item = "C.I.: "  + this.sumariado.ci + "\n" + 
                  "AP PATERNO: " + this.sumariado.appaterno + "\n" + 
                  "AP MATERNO: " + this.sumariado.apmaterno + "\n" + 
                  "NOMBRE: " + this.sumariado.nombre
    }else{
      this.documento = this.dialog_data['documentoSeleccionado']
      console.log(this.documento)
      this.item = "NRO CORRESPONDENCIA: " + (this.documento.n_correspondencia||"-") + `\n` +
                  "NRO CITE: " + (this.documento.n_cite||"-") + "\n" + 
                  "NOMBRE: " + (this.documento.nombre || "-") + "\n" + 
                  "REFERENCIA: " + (this.documento.referencia)
    }
    
  }

  //Cancelar Button
  onCancel(){
    this.dialogRef.close('no');
  }

  //Archivar Button
  onConfirm(){
    let ids = {}
    if(this.title == 'SUMARIADO'){
      ids = {
        id_proceso: this.proceso,
        id_sumariado: this.sumariado.id_sumariado
      }
      this.procesadoService.updateProcesadoEstado(ids).subscribe( res => {
        console.log(res)
        this.dialogRef.close('yes');
      })
    }else{
      ids = {
        id_proceso: this.proceso,
        id_documento: this.documento.id_documento
      }
      console.log(ids)
      this.documentoService.updateDocumentoEstado(ids).subscribe( res => {
        console.log(res)
        this.dialogRef.close('yes');
      })
    }    
  }

}
