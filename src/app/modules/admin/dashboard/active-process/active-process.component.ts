import { EditProcessDialogComponent } from './edit-process-dialog/edit-process-dialog.component';
import { NewProcessDialogComponent } from './new-process-dialog/new-process-dialog.component';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

export interface Proceso{
  id_proceso: string;
  nombre: string;
  fecha_inicio: string;
  id_sumariante: string;
}

const ELEMENT_DATA2: Proceso[] = [
  {id_proceso: 'p1', nombre:'n1', fecha_inicio:'10/05/22', id_sumariante:'sum1'}
];
@Component({
  selector: 'app-active-process',
  templateUrl: './active-process.component.html',
  styleUrls: ['./active-process.component.scss']
})
export class ActiveProcessComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() user_name = 'U1';

  displayedColumns: string[] = ['id_proceso', 'nombre', 'fecha_inicio', 'id_sumariante', 'button-edit'];
  dataSource!: MatTableDataSource<Proceso>;
  data:any;
  ELEMENT_DATA: Proceso[] = [];
  

  constructor(
    private _liveAnnouncer:LiveAnnouncer,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log(this.user_name)
    const baseUrl = 'http://localhost:8080/process'
    this.dataSource = new MatTableDataSource(ELEMENT_DATA2);
    
    this.http.get(`${baseUrl}/${this.user_name}`).subscribe(data => {
      this.data = data;
      //console.log(this.data)
      this.saveDataProcess(data)
      console.log(this.ELEMENT_DATA)
     
      // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

      
    
      }, error => console.error(error));
   
  
  }
  
  saveDataProcess(data: any){
    var process: Proceso = {
      id_proceso: '', 
      nombre:'', 
      fecha_inicio:'', 
      id_sumariante:''
    }

    for (let p in data){
      process.fecha_inicio = data[p]['fecha_inicio'];
      process.id_proceso = data[p]['id_proceso'];
      process.nombre = data[p]['nombre'];
      process.id_sumariante = 'SUM1';

      this.ELEMENT_DATA.push(process)
      
    }

  }

  public pressed(){
    const dialogRef = this.dialog.open(EditProcessDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  


  announceSortChange(sortState:Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce('Sorted${sortState.direction}ending')
    }else{
      this._liveAnnouncer.announce('sorting cleared')
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProcessDialogComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
export interface PeriodicElement {
  id_procesp: string;
  nombre: string;
  fecha_inicio: string;
  id_sumariante: string;
}