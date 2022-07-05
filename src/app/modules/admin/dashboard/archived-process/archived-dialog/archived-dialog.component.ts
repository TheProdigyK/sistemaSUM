import { ProcesadoService } from './../../../../../services/procesado.service';
import { Sumariado } from './../../../../../models/sumariado';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'src/app/models/documento';
import { DocumentoService } from 'src/app/services/documento.service';
import { ViewDocumentsDialogComponent } from '../../view-process/view-documents-dialog/view-documents-dialog.component';
import { User } from 'src/app/models/user';
import { Proceso } from 'src/app/models/proceso';
import decode from 'jwt-decode'
import { SiblingSharedService } from 'src/app/services/sibling-shared.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-archived-dialog',
  templateUrl: './archived-dialog.component.html',
  styleUrls: ['./archived-dialog.component.scss']
})
export class ArchivedDialogComponent implements OnInit {

  //SUMARIADO TABLA
  sumariadoColumns: string[] = ['ci', 'apellido', 'direccion'];
  dataSumariado!: MatTableDataSource<Sumariado>;
  @ViewChild('sumariadoPaginator') sumariadoPaginator!: MatPaginator;
  @ViewChild(MatSort) sortSumariado!: MatSort;


  //DOCUMENTO TABLA
  documentoColumns: string[] = ['n_correspondencia', 'n_cite', 'nombre', 'referencia', 'actions'];
  dataDocumento!: MatTableDataSource<Documento>;
  @ViewChild('documentoPaginator') documentoPaginator!: MatPaginator;
  @ViewChild(MatSort) sortDocumento!: MatSort;

  token = localStorage.getItem('token');
  sumariante!:User
  proceso!:Proceso

  constructor(
    private router: Router,
    private location: Location,
    private procesadoService: ProcesadoService,
    private documentoService: DocumentoService,
    private siblingSharedService: SiblingSharedService
  ) { }

  ngOnInit(): void {

    this.sumariante = decode(this.token || "")
    this.proceso = this.siblingSharedService.getRowProcess()

    if(this.sumariante != null && this.proceso != null){
      this.getProcesados()
      this.getDocuments()
    }
    
    
  }

  obtenerPDF(row:Documento){
    window.open('https://documentalprueba.gestora.bo/wfdocs/workflow/2022/INTERNA/GNS/ever-ramirez/5190-8-157-22_28062022_102807_1_FIRMADO.pdf')
  }

  onTerminate(){
    //this.router.navigate(['dashboard/archivedSU'])
    this.location.back()
  }

  getProcesados(){
    this.procesadoService.getProcesadosById(this.proceso.id_proceso!).subscribe(res =>{
      this.dataSumariado = new MatTableDataSource(res)
      this.dataSumariado.paginator = this.sumariadoPaginator;
      this.dataSumariado.sort = this.sortSumariado;
    })

  }

  getDocuments(){
    this.documentoService.getDocuments(this.proceso.id_proceso!).subscribe(
      res =>{
        this.dataDocumento = new MatTableDataSource(res)
        this.dataDocumento.paginator = this.documentoPaginator;
        this.dataDocumento.sort = this.sortDocumento;
      }
    )
  }
}
