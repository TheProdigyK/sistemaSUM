import { ProcesoService } from 'src/app/services/proceso.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-archived-process',
  templateUrl: './archived-process.component.html',
  styleUrls: ['./archived-process.component.scss']
})
export class ArchivedProcessComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() user_name = 1;

  //MATERIAL TABLE VARIABLES
  displayedColumns: string[] = ['id_proceso', 'nombre', 'fecha_inicio', 'id_sumariante'];
  dataSource!: MatTableDataSource<any>;
  data:any;

  //MATERIAL SEARCH IN TABLE
  searchKey!: string;

  constructor(
    private _liveAnnouncer:LiveAnnouncer,
    private dialog: MatDialog,
    private procesoService: ProcesoService
  ) { }

  ngOnInit(): void {
    
    //BACKEND GET PROCESS BY ID USER
    this.procesoService.getProcessById(this.user_name).subscribe(data => {
      this.data = data;
     
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      }, error => console.error(error));
  }

  onCreate(){

  }

  //DIALOG EDIT PROCESS
  onEdit(row: any){
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
}
