import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proceso } from 'src/app/models/proceso';
import { ProcesoService } from 'src/app/services/proceso.service';

@Component({
  selector: 'app-archivar-proceso-dialog',
  templateUrl: './archivar-proceso-dialog.component.html',
  styleUrls: ['./archivar-proceso-dialog.component.scss']
})
export class ArchivarProcesoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ArchivarProcesoDialogComponent>,
    private procesoServices: ProcesoService,
    @Inject(MAT_DIALOG_DATA) public proceso: Proceso
  ) { }

  ngOnInit(): void {
  }


  //Cancelar Button
  onCancel(){
    this.dialogRef.close();
  }

  //Archivar Button
  onArchivarProcess(){
    this.procesoServices.archivarProceso(this.proceso).subscribe(res =>{
      this.dialogRef.close('delete');
    })

  }

}
