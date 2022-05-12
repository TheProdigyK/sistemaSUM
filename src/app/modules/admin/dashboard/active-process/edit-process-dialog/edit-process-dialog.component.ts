import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface proceso {
  numero: number;
  nombre: string;
  fecha_inicio: string;
}

const ELEMENT_DATA: proceso[] = [
  {numero: 1, nombre: 'Memorial No 1', fecha_inicio: '10/05/22'},
  {numero: 2, nombre: 'Nota No 1', fecha_inicio: '10/05/22'},
  {numero: 3, nombre: 'Comunicado No 1', fecha_inicio: '10/05/22'},
  {numero: 4, nombre: 'Acta No 1', fecha_inicio: '10/05/22'}
  
];

@Component({
  selector: 'app-edit-process-dialog',
  templateUrl: './edit-process-dialog.component.html',
  styleUrls: ['./edit-process-dialog.component.scss']
})
export class EditProcessDialogComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  displayedColumns: string[] = ['position', 'name', 'date_init', 'tipo_documento', 'actions'];
  dataSource !: MatTableDataSource<proceso>;



  constructor(
    public dialogRef: MatDialogRef<EditProcessDialogComponent>,
    private _liveAnnouncer:LiveAnnouncer,
    private dialog: MatDialog,
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
  announceSortChange(sortState:Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce('Sorted${sortState.direction}ending')
    }else{
      this._liveAnnouncer.announce('sorting cleared')
    }
  }
}
