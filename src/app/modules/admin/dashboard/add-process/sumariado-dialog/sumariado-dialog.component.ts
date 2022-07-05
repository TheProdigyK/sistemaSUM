import { Persona } from './../../../../../models/persona';
import { SumariadoService } from 'src/app/services/sumariado.service';
import { SumariadoL } from './../../../../../models/sumariadoL';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Sumariado } from 'src/app/models/sumariado';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sumariado-dialog',
  templateUrl: './sumariado-dialog.component.html',
  styleUrls: ['./sumariado-dialog.component.scss']
})

export class SumariadoDialogComponent implements OnInit {

  querySearch = new FormControl('', Validators.required);
  selectApi = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  isLoading = false;

  sumariadoColumns: string[] = ['select', 'ci', 'appaterno', 'direccion', 'cargo'];
  dataSumariado!: MatTableDataSource<Sumariado>;
  sumariadoSelection = new SelectionModel<Sumariado>(true, []);
  @ViewChild(MatPaginator) sumariadoPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    public dialogRef: MatDialogRef<SumariadoDialogComponent>,
    private sumariadoServices: SumariadoService

  ) { }

  ngOnInit(): void {
  }

  //SELECCIONAR UN SOLO DOCUMENTO (CHECKBOX METODO)
  selectHandler(row: Sumariado) {
    if (!this.sumariadoSelection.isSelected(row)) {
      this.sumariadoSelection.clear();
    }
    this.sumariadoSelection.toggle(row);
    console.log(row)

  }

  //SEARCH SUMARIADO BUTTON
  searchSumariado(){
    
    if(this.selectApi.value == 'SISTEMA SUMARIANTE'){
      //SISTEMA SUMARIANTE
      this.isLoading = true;
      this.sumariadoServices.getSumariadosByQuery(this.querySearch.value).subscribe(
        data =>{
          this.dataSumariado = new MatTableDataSource(data)
          this.dataSumariado.paginator = this.sumariadoPaginator;
          this.dataSumariado.sort = this.sort;
          this.isLoading = false;
        }
      )
    }else if(this.selectApi.value == 'SISTEMA SAP'){
      this.isLoading = true;
      this.sumariadoServices.getSumariadoRRHH(this.querySearch.value).subscribe(
        data =>{
          let sumariado:Sumariado[] = []
          data.forEach(x=>{
            let sum:Sumariado = {
              ci: x.dninro,
              nombre: x.nomfun,
              appaterno: x.appfun,
              apmaterno: x.apmfun,
              direccion: x.dirfun,
              cargo: x.nompue
            }
            sumariado.push(sum)
          })
  
          this.dataSumariado = new MatTableDataSource(sumariado)
          this.dataSumariado.paginator = this.sumariadoPaginator;
          this.dataSumariado.sort = this.sort;

          this.isLoading = false;

          console.log(data)
        }
      )
    }   
    
  }

  //CANCEL BUTTON
  onCancel(){
    this.dialogRef.close({event:"cancel"});
  }

  //SELECT SUMARIADO BUTTON
  onSelectSumariado(){

    //Registra en sistema sumariante al sumariado del sistema Sap
    if(this.selectApi.value == 'SISTEMA SAP'){
      let persona:Persona = {
        ci: this.sumariadoSelection.selected[0].ci,
        appaterno: this.sumariadoSelection.selected[0].appaterno,
        apmaterno: this.sumariadoSelection.selected[0].apmaterno,
        nombre: this.sumariadoSelection.selected[0].nombre,
        direccion: this.sumariadoSelection.selected[0].direccion,
        email: this.sumariadoSelection.selected[0].email
      }

      this.sumariadoServices.createUserSumariado(persona).subscribe(res=>{

        let sum:Sumariado ={
          id_sumariado: res.id_sumariado,
          ci: this.sumariadoSelection.selected[0].ci,
          nombre: this.sumariadoSelection.selected[0].nombre,
          appaterno: this.sumariadoSelection.selected[0].appaterno,
          apmaterno: this.sumariadoSelection.selected[0].apmaterno,
          direccion: this.sumariadoSelection.selected[0].direccion,
          email: this.sumariadoSelection.selected[0].email,
          cargo: this.sumariadoSelection.selected[0].cargo,
        }

        console.log(res)

        this.dialogRef.close({event:"add", data:sum})
      })
    }
    else if(this.selectApi.value == 'SISTEMA SUMARIANTE'){
      this.dialogRef.close({event:"add", data:this.sumariadoSelection.selected[0]})
    }
    
  }

}
