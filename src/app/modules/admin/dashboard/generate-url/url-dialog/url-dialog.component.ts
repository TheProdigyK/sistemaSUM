import { Documento } from './../../../../../models/documento';
import { Compartida } from './../../../../../models/compartida';
import { EnlaceObj } from './../../../../../models/enlaceObj';
import { Sumariado } from 'src/app/models/sumariado';
import { DireccionURLService } from './../../../../../services/direccion-url.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SumariadoService } from 'src/app/services/sumariado.service';
import { environment } from 'src/environments/environment';
import decode from 'jwt-decode'
import { User } from 'src/app/models/user';
import { catchError, concat, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-url-dialog',
  templateUrl: './url-dialog.component.html',
  styleUrls: ['./url-dialog.component.scss']
})
export class UrlDialogComponent implements OnInit {

  sumariado: Sumariado = {}
  documentos: Documento[] = []
  enlaceObj: EnlaceObj = {}
  id_proceso!: number

  urlString = new FormControl('', Validators.required);
  emailSet = new FormControl('', Validators.required);

  //TOKEN USER
  token = localStorage.getItem('token');
  public sumariante!: User
  
  constructor(
    public dialogRef: MatDialogRef<UrlDialogComponent>,
    private sumariadoService: SumariadoService,
    private direccionUrlService: DireccionURLService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialog_data: any
  ) { }

  ngOnInit(): void {
    this.sumariado = this.dialog_data['sumariadoSeleccionado']
    this.documentos = this.dialog_data['documentSelected']
    this.id_proceso = this.dialog_data['id_proceso']
    console.log(this.sumariado, this.documentos)

    //DECODIFICANDO TOKEN EN LA CLASE SUMARIANTE
    this.sumariante = decode(this.token || "");
    
  }

  generarEnlace(){
    let date: Date = new Date();
    this.urlString.setValue(environment.URL_SISSUMARIANTE)
    this.enlaceObj = {
      direccion_url: environment.URL_SISSUMARIANTE,
      fecha_registro: date,
      fecha_modificacion: date,
      estado: 'activo',
      id_sumariado: this.sumariado.id_sumariado,
      id_usuario: this.sumariado.id_usuario,
      id_perfil: this.sumariado.id_perfil,
      ci: this.sumariado.ci,
      id_proceso: this.id_proceso
    }
    this.direccionUrlService.postCreateUrl(this.enlaceObj).subscribe(res=>{      
      this.crearDocumentosCompartidos()
    })

  }

  onTerminate(){
    this.dialogRef.close({event:"cancel"});
  }

  crearDocumentosCompartidos(){
    // this.sumariadoService.postSendEmailById(this.sumariado.id_sumariado!).subscribe(res =>{
    //   console.log("EMAIL ENVIADO CON EXITO")
    // });
    let compartidaTable:Compartida[] = []
    this.documentos.forEach(doc=>{
      let temp:Compartida = {
        id_documento: doc.id_documento,
        id_proceso: this.id_proceso,
        id_usuario: this.sumariante.id_usuario,
        id_perfil: this.sumariante.id_perfil,
        ci: this.sumariante.ci,
        id_sumariado: this.sumariado.id_sumariado,
        // email_sumariado: this.sumariado.email
        email_sumariado: this.emailSet.value
      }

      compartidaTable.push(temp)
    })
    let httpReqs = compartidaTable
    .map(i => 
        this.sumariadoService.postCompartirDocumentos(i)
        .pipe(catchError(err => of({err})))
        );
    
    concat(...httpReqs).subscribe()


  }

  send_email(){
    let query={
      id_usuario: this.sumariante.id_usuario,
      id_sumariado: this.sumariado.id_sumariado,
      email_sumariado: this.emailSet.value
    }

    this.sumariadoService.postSendEmail(query).subscribe( res => {
      this._snackBar.open("EMAIL ENVIADO CON EXITO !", "CERRAR", {duration: 5000})
      this.dialogRef.close({event:"finish"});
    })
    
  }


}
