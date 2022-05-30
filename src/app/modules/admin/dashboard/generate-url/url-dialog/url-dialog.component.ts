import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SumariadoService } from 'src/app/services/sumariado.service';

@Component({
  selector: 'app-url-dialog',
  templateUrl: './url-dialog.component.html',
  styleUrls: ['./url-dialog.component.scss']
})
export class UrlDialogComponent implements OnInit {

  urlString = new FormControl('', Validators.required);
  
  constructor(
    public dialogRef: MatDialogRef<UrlDialogComponent>,
    private sumariadoService: SumariadoService,
    @Inject(MAT_DIALOG_DATA) public id_sumariado: number
  ) { }

  ngOnInit(): void {
    console.log(this.id_sumariado)
    
  }

  generarEnlace(){
    this.urlString.setValue("http:4200/Auth/XX11122313156")
  }

  onTerminate(){
    this.dialogRef.close({event:"cancel"});
  }

  send_email(){
    this.sumariadoService.postSendEmailById(this.id_sumariado).subscribe(res =>{
      console.log("EMAIL ENVIADO CON EXITO")
    });
  }



}
