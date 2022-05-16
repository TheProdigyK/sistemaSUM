import { EditProcessDialogComponent } from './edit-process-dialog/edit-process-dialog.component';
import { NewProcessDialogComponent } from './new-process-dialog/new-process-dialog.component';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-active-process',
  templateUrl: './active-process.component.html',
  styleUrls: ['./active-process.component.scss']
})
export class ActiveProcessComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() user_name = 1;

  //MATERIAL TABLE VARIABLES
  displayedColumns: string[] = ['id_proceso', 'nombre', 'fecha_inicio', 'id_sumariante', 'actions'];
  dataSource!: MatTableDataSource<any>;
  data:any;
  
  //MATERIAL SEARCH IN TABLE
  searchKey!: string;

  constructor(
    private _liveAnnouncer:LiveAnnouncer,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllProcess()    
  }

  getAllProcess(){
    const baseUrl = 'http://localhost:8080/process'
    //BACKEND GET PROCESS BY ID USER
    this.http.get(`${baseUrl}/${this.user_name}/activo`).subscribe(data => {
      //this.data = data;
      let array:any = data
     
      this.dataSource = new MatTableDataSource(array);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      }, error => console.error(error)); 
  }

  //SORT ELEMENT EVENT
  announceSortChange(sortState:Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce('Sorted${sortState.direction}ending')
    }else{
      this._liveAnnouncer.announce('sorting cleared')
    }
  }

  //SEARCH ELEMENT IN TABLE EVENT
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  //DIALOG NEW PROCESS
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(NewProcessDialogComponent,dialogConfig).afterClosed().subscribe(
      val => {
        if(val === 'save'){
          this.getAllProcess()
        }
      }
    );
  }

  //DIALOG EDIT PROCESS
  onEdit(row: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(NewProcessDialogComponent, dialogConfig).afterClosed().subscribe(
      val => {
        if(val === 'update'){
          this.getAllProcess()
        }
      }
    );

  }


  public pressed(){
    const dialogRef = this.dialog.open(EditProcessDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




}
