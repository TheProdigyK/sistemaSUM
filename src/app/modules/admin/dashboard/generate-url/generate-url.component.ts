import { UrlDialogComponent } from './url-dialog/url-dialog.component';
import { Sumariado } from 'src/app/models/sumariado';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProcesadoService } from 'src/app/services/procesado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TipoDocumento } from 'src/app/models/tipo_documento';

@Component({
  selector: 'app-generate-url',
  templateUrl: './generate-url.component.html',
  styleUrls: ['./generate-url.component.scss']
})
export class GenerateUrlComponent implements OnInit {

  sumariadoColumns: string[] = ['position', 'ci', 'name', 'actions'];
  dataSumariado:Sumariado[] = []
  nProceso = new FormControl('', Validators.required);
  selectedTipoDocumento = new FormControl('', Validators.required);


  id_proceso!: number;
  nombre_proceso!: string;

  TipoDocumentos!: TipoDocumento[]


  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private procesadoService: ProcesadoService
  ) { }

  ngOnInit(): void {
    this.id_proceso = JSON.parse(this.route.snapshot.paramMap.get('id_proceso') || "");
    this.nombre_proceso = JSON.parse(this.route.snapshot.paramMap.get('nombreProceso') || "");
    this.nProceso.setValue(this.nombre_proceso)

    this.typeDocuments()
    this.getProcesados()



  }

  onCancel(){
    this.router.navigate(['dashboard/active'])
  }

  onTerminarProceso(){
    this.router.navigate(['dashboard/active'])
  }

  //GET TYPE DOCUMENTS
  typeDocuments(){
    const baseUrl = 'http://localhost:8080/document'
    this.http.get<TipoDocumento[]>(`${baseUrl}`).subscribe(
      data =>{
        this.TipoDocumentos = data
      }
    )
  }

  getProcesados(){
    this.procesadoService.getProcesadosById(this.id_proceso).subscribe(res =>{
      this.dataSumariado = res
    })

  }

  onGetUrl(row:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UrlDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){
          
        }
      }
    );

  }

}
