import { ProcesoService } from 'src/app/services/proceso.service';
import { User } from './../../../../../models/user';
import { Proceso } from './../../../../../models/proceso';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-proceso-dialog',
  templateUrl: './nuevo-proceso-dialog.component.html',
  styleUrls: ['./nuevo-proceso-dialog.component.scss']
})
export class NuevoProcesoDialogComponent implements OnInit {

  //FORMULARIO REACTIVO
  processForm !: FormGroup

  //NUEVO PROCESO
  nuevo_proceso!: Proceso


  constructor(
    public dialogRef: MatDialogRef<NuevoProcesoDialogComponent>,
    private formBuilder: FormBuilder,
    private procesoService: ProcesoService,
    @Inject(MAT_DIALOG_DATA) public sumariante: User
  ) { }

  ngOnInit(): void {
    this.onFormCreate();
    console.log(this.sumariante)
  }

  //REACTIVE FORM CREATE
  onFormCreate(){
    this.processForm = this.formBuilder.group({
      processName : ['', Validators.required]
    })
  }

  //CANCEL BUTTON
  onCancel(){
    this.dialogRef.close();

  }

  //CREATE PROCESS BUTTON DIALOG
  onCreateProcess(){
    let date: Date = new Date();
    this.nuevo_proceso = {
      nombre: this.processForm.value['processName'],
      estado: "activo",
      fecha_registro: date,
      fecha_modificacion: date,
      usuario_registro: this.sumariante.nombre,
      id_usuario: this.sumariante.id_usuario,
      id_perfil: this.sumariante.id_perfil,
      ci: this.sumariante.ci
    }
    this.procesoService.createProcess(this.nuevo_proceso).subscribe(
      res =>{ 
        this.dialogRef.close('save');
    })
    
    
  }
}
