import { SumariadoService } from 'src/app/services/sumariado.service';
import { SumariadoL } from './../../../../../models/sumariadoL';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Sumariado } from 'src/app/models/sumariado';


export class SumariadoCheck{
  id_sumariado: number;
  checked: Boolean;

  constructor(id_sumariado: number){
    this.id_sumariado = id_sumariado;
    this.checked = false;
  }
}
const ELEMENT_DATA: SumariadoL[] = [
  {numero: 1, nombre: 'Sumariado 1', fecha: '20-05-2022'},
  {numero: 2, nombre: 'Sumariado 2', fecha: '19-05-2022'},
  {numero: 3, nombre: 'Sumariado 3', fecha: '18-05-2022'},
  {numero: 4, nombre: 'Sumariado 4', fecha: '17-05-2022'},
  {numero: 5, nombre: 'Sumariado 5', fecha: '16-05-2022'}
];

@Component({
  selector: 'app-sumariado-dialog',
  templateUrl: './sumariado-dialog.component.html',
  styleUrls: ['./sumariado-dialog.component.scss']
})
export class SumariadoDialogComponent implements OnInit {

  //TABLE
  displayedColumns: string[] = ['id', 'name', 'date', 'actions'];
  dataSource = ELEMENT_DATA;

  //CHECK BOX LIST
  sumariadoCheckedList: SumariadoCheck[] = []
  checked = [];

  value=''

  disableSelect = true;

  sumariados!:Sumariado[]
  
  selectedSumariado = new FormControl('', Validators.required);
  queryCi = new FormControl('', Validators.required);
  

  constructor(
    public dialogRef: MatDialogRef<SumariadoDialogComponent>,
    private http: HttpClient,
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
