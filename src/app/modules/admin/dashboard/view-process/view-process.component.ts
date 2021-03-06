import { SiblingSharedService } from './../../../../services/sibling-shared.service';
import { ViewDocumentsDialogComponent } from './view-documents-dialog/view-documents-dialog.component';
import { User } from './../../../../models/user';
import { ProcesoService } from 'src/app/services/proceso.service';
import { MatPaginator } from '@angular/material/paginator';
import { Proceso } from './../../../../models/proceso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import decode from 'jwt-decode'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-process',
  templateUrl: './view-process.component.html',
  styleUrls: ['./view-process.component.scss']
})
export class ViewProcessComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'type', 'actions'];
  dataDocument:any[] = [
    {nombre: "DOC#1", fecha_registro: "26/05/2022", tipo: "Memorial"},
    {nombre: "DOC#2", fecha_registro: "26/05/2022", tipo: "Nota"},
    {nombre: "DOC#3", fecha_registro: "26/05/2022", tipo: "Nota"},
    {nombre: "DOC#4", fecha_registro: "26/05/2022", tipo: "Memorial"},
  ]

  //TABLA PROCESOS VARIABLES
  procesoColumns: string[] = ['nombre', 'fecha_modificacion', 'appaterno', 'actions'];
  dataProceso!: MatTableDataSource<Proceso>;
  @ViewChild(MatPaginator) procesoPaginator!: MatPaginator;
  @ViewChild(MatSort) sortProceso!: MatSort;

  token = localStorage.getItem('token');
  sumariado!:User


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private procesoServices:ProcesoService,
    private siblingSharedServices: SiblingSharedService
  ) { }

  ngOnInit(): void {
    this.sumariado = decode(this.token || "")
    this.getActiveProcess()
  }

  //Ver X proceso 
  verProceso(row:Proceso){
    this.router.navigate(['dashboard/sproceso']);
    this.siblingSharedServices.setData(row)
  }

  ngAfterViewInit(){
    localStorage.removeItem("sumariadoRow_process")
  }

  //Obtener procesos Activos
  getActiveProcess(){
    this.procesoServices.getProcessByIdSumariado(this.sumariado.id_usuario!).subscribe(
      procesos =>{
        console.log(procesos)
        this.dataProceso = new MatTableDataSource(procesos)
        this.dataProceso.paginator = this.procesoPaginator;
        this.dataProceso.sort = this.sortProceso;


    })
  }

}
