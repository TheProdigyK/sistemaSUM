import { SumariadoService } from 'src/app/services/sumariado.service';
import { SumariadoL } from './../../../../../models/sumariadoL';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Sumariado } from 'src/app/models/sumariado';

@Component({
  selector: 'app-sumariado-dialog',
  templateUrl: './sumariado-dialog.component.html',
  styleUrls: ['./sumariado-dialog.component.scss']
})
export class SumariadoDialogComponent implements OnInit {

  value=''

  disableSelect = true;

  sumariados!:Sumariado[]
  
  selectedSumariado = new FormControl('', Validators.required);
  queryCi = new FormControl('', Validators.required);
  

  constructor(
    public dialogRef: MatDialogRef<SumariadoDialogComponent>,
    private sumariadoServices: SumariadoService

  ) { }

  ngOnInit(): void {
  }

  //SEARCH SUMARIADO BUTTON
  searchSumariado(){
    this.disableSelect = false
    this.sumariadoServices.getSumariadosByQuery(this.queryCi.value).subscribe(
      data =>{
        this.sumariados = data;
      }
    )
  }

  //CANCEL BUTTON
  onCancel(){
    this.dialogRef.close({event:"cancel"});
  }

  //SELECT SUMARIADO BUTTON
  onSelectSumariado(){
    let new_row!:Sumariado
    this.sumariados.forEach(sumariado =>{
      if(sumariado.ci == this.selectedSumariado.value){
        new_row = sumariado
        return
      }
    })
    this.dialogRef.close({event:"add",data:new_row})
  }

}
