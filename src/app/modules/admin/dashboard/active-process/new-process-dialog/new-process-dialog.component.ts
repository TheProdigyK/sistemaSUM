import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface proceso {
  numero: number;
  nombre: string;
  fecha_inicio: string;
}

export interface procesoB {
  nombre: string;
  id_usuario: string;
  id_perfil: string;
  ci: string;
}

const ELEMENT_DATA: proceso[] = [
  {numero: 1, nombre: 'Memorial No 1', fecha_inicio: '10/05/22'},
  {numero: 2, nombre: 'Nota No 1', fecha_inicio: '10/05/22'},
  {numero: 3, nombre: 'Comunicado No 1', fecha_inicio: '10/05/22'},
  {numero: 4, nombre: 'Acta No 1', fecha_inicio: '10/05/22'}
  
];

@Component({
  selector: 'app-new-process-dialog',
  templateUrl: './new-process-dialog.component.html',
  styleUrls: ['./new-process-dialog.component.scss']
})
export class NewProcessDialogComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  displayedColumns: string[] = ['numero', 'nombre', 'fecha_inicio', 'actions'];
  dataSource !: MatTableDataSource<proceso>;



  constructor(
    public dialogRef: MatDialogRef<NewProcessDialogComponent>,
    private _liveAnnouncer:LiveAnnouncer,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA); 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngAfterViewInit(){
    //this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  submitProcess(){
    const baseUrl = 'http://localhost:8080/process'
    
    const data: procesoB = { nombre: "Proceso 3", id_usuario: "U1", id_perfil: "1", ci: "1122339 LP"}
    console.log(data)
    //BACKEND GET PROCESS BY ID USER
    this.http.post(baseUrl, data).subscribe(
      respuesta =>{ console.log("yes")
      })
    
  }

  announceSortChange(sortState:Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce('Sorted${sortState.direction}ending')
    }else{
      this._liveAnnouncer.announce('sorting cleared')
    }
  }
}
