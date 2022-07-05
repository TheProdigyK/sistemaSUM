import { SiblingSharedService } from './../../../../services/sibling-shared.service';
import { ArchivedDialogComponent } from './archived-dialog/archived-dialog.component';
import { Proceso } from './../../../../models/proceso';
import { ProcesoService } from 'src/app/services/proceso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import decode from 'jwt-decode'
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archived-process',
  templateUrl: './archived-process.component.html',
  styleUrls: ['./archived-process.component.scss']
})
export class ArchivedProcessComponent implements OnInit {

  @ViewChild('processPaginator') processPaginator!: MatPaginator;
  @ViewChild(MatSort) sortProcess!: MatSort;
  

  //TABLE VARIABLES
  processColumns: string[] = ['nombre', 'fecha_registro', 'fecha_modificacion', 'nombresumariante', 'actions'];
  dataProcess!: MatTableDataSource<Proceso>;
  
  //TOKEN
  token = localStorage.getItem('token');
  public sumariante!: User

  //MATERIAL SEARCH IN TABLE
  searchKey!: string;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private procesoService: ProcesoService,
    private siblingSharedService: SiblingSharedService
  ) { }

  ngOnInit(): void {
    
    this.sumariante = decode(this.token || "")
    console.log(this.sumariante)

    if(this.sumariante.id_perfil == 1){
      this.obtenerProcesos()
    }else{
      console.log("yes")
      this.obtenerTodosLosProcesos()      
    }
    

    
  }

  onCreate(){

  }

  //VER DETALLES DEL PROCESO
  verDetalles(row: Proceso){
    this.siblingSharedService.setRowProcess(row)
    this.router.navigate(['dashboard/verProceso'])
  }

  obtenerProcesos(){
    //BACKEND GET PROCESS BY ID USER
    this.procesoService.getProcessById(this.sumariante).subscribe(data => {
    
      this.dataProcess = new MatTableDataSource(data);
      this.dataProcess.paginator = this.processPaginator
      this.dataProcess.sort = this.sortProcess
      
    });
  }

  obtenerTodosLosProcesos(){
    //BACKEND GET PROCESS BY ID USER
    this.procesoService.getAllProcessSU().subscribe(data => {
    
      this.dataProcess = new MatTableDataSource(data);
      this.dataProcess.paginator = this.processPaginator
      this.dataProcess.sort = this.sortProcess
      
    });
  }

  //SEARCH ELEMENT IN TABLE EVENT
  // onSearchClear() {
  //   this.searchKey = "";
  //   this.applyFilter();
  // }

  // applyFilter() {
  //   this.dataSource.filter = this.searchKey.trim().toLowerCase();
  // }
}
