import { Persona } from './../../../../../models/persona';
import { SumariadoService } from 'src/app/services/sumariado.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sumariado-crear-dialog',
  templateUrl: './sumariado-crear-dialog.component.html',
  styleUrls: ['./sumariado-crear-dialog.component.scss']
})
export class SumariadoCrearDialogComponent implements OnInit {

  personaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SumariadoCrearDialogComponent>,
    private fb: FormBuilder,
    private sumariadoServices: SumariadoService
  ) { 
    this.personaForm = this.fb.group({
      ci: ['', Validators.required],
      appaterno: ['', Validators.required],
      apmaterno: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close({event:"cancel"});

  }

  onCreateSumariado(){
    console.log('yes')
    let nuevoSumariado:Persona = this.personaForm.value
    this.sumariadoServices.createUserSumariado(nuevoSumariado).subscribe(
      res =>{
        this.dialogRef.close({event:"success"});
      }
    )
    

  }

}
