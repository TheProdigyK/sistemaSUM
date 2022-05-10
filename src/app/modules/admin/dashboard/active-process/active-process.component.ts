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

@Component({
  selector: 'app-active-process',
  templateUrl: './active-process.component.html',
  styleUrls: ['./active-process.component.scss']
})
export class ActiveProcessComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() user_name = 'USER_2';

  displayedColumns: string[] = ['id_proceso', 'nombre', 'fecha_inicio', 'id_sumariante', 'button-edit'];
  dataSource!: MatTableDataSource<any>;
  data:any;

  constructor(
    private _liveAnnouncer:LiveAnnouncer,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log(this.user_name)
    const baseUrl = 'http://localhost:8080/process'
    
    this.http.get(`${baseUrl}/${this.user_name}`).subscribe(data => {
      this.data = data;
      console.log(this.data)
     
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator
      
    
      }, error => console.error(error));
   
  
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