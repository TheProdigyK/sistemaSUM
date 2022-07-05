import { ArchivarProcesoDialogComponent } from './archivar-proceso-dialog/archivar-proceso-dialog.component';
import { Proceso } from './../../../../models/proceso';
import { NuevoProcesoDialogComponent } from './nuevo-proceso-dialog/nuevo-proceso-dialog.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import decode from 'jwt-decode'
import { Router } from '@angular/router';
import { ProcesoService } from 'src/app/services/proceso.service';

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
  dataSource!: MatTableDataSource<Proceso>;
  
  //MATERIAL SEARCH IN TABLE
  searchKey: string = '';

  //STORAGE
  token = localStorage.getItem('token');
  public sumariante!: User

  constructor(
    private _liveAnnouncer:LiveAnnouncer,
    private dialog: MatDialog,
    private procesoServices: ProcesoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sumariante = decode(this.token || "")
    this.getAllProcess()    
  }

  //BACKEND GET PROCESS BY ID USER
  getAllProcess(){
    this.procesoServices.getAllProcess(this.sumariante).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
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
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = this.sumariante;
    this.dialog.open(NuevoProcesoDialogComponent,dialogConfig).afterClosed().subscribe(
      val => {
        if(val === 'save'){
          this.getAllProcess()
        }
      }
    );
  }

  onGenerateUrl(row: Proceso){
    this.router.navigate(['dashboard/generateUrl', {id_proceso: JSON.stringify(row.id_proceso), nombreProceso: JSON.stringify(row.nombre)}])

  }

  //DIALOG EDIT PROCESS
  onEdit(row: Proceso){
    this.router.navigate(['dashboard/addProcess', {id_proceso: JSON.stringify(row.id_proceso), nombreProceso: JSON.stringify(row.nombre)}])
  }

  //DIALOG ARCHIVED PROCESS
  onDelete(row: Proceso){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = row;
    this.dialog.open(ArchivarProcesoDialogComponent,dialogConfig).afterClosed().subscribe(
      val => {
        if(val === 'delete'){
          this.getAllProcess()
        }
      }
    );
  }

}
