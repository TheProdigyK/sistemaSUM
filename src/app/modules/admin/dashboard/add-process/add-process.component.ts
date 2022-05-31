import { DocumentoService } from './../../../../services/documento.service';
import { DocumentoStorage } from './../../../../models/documentoStorage';
import { Procesado } from './../../../../models/procesado';
import { Documento } from './../../../../models/documento';
import { Sumariado } from './../../../../models/sumariado';
import { User } from './../../../../models/user';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { SumariadoDialogComponent } from './sumariado-dialog/sumariado-dialog.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, from, concatMap, catchError, of, concat, tap } from 'rxjs';
import decode from 'jwt-decode'
import { ProcesadoService } from 'src/app/services/procesado.service';


@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.scss']
})


export class AddProcessComponent implements OnInit {

  processForm !: FormGroup
  panelOpenState = false;

  displayedColumns: string[] = ['name', 'date', 'type', 'actions'];
  dataDocument: Documento[] = [];
  dataDocumentStorage: DocumentoStorage[] = [];

  sumariadoColumns: string[] = ['position', 'ci', 'name', 'actions'];
  dataSumariado: Sumariado[] = []

  token = localStorage.getItem('token');
  public sumariante!: User

  id_proceso!: number;
  nombre_proceso!: string;

  nProceso = new FormControl('', Validators.required);

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  @ViewChild('docTable') docTable!: MatTable<any>;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private procesadoService: ProcesadoService,
    private documentoService: DocumentoService
  ) { }

  ngOnInit(): void {
    this.id_proceso = JSON.parse(this.route.snapshot.paramMap.get('id_proceso') || "");
    this.nombre_proceso = JSON.parse(this.route.snapshot.paramMap.get('nombreProceso') || "");
    this.nProceso.setValue(this.nombre_proceso)
    this.sumariante = decode(this.token || "");
    console.log(this.id_proceso)
    this.getProcesados()
    this.getDocuments()
  }

  //CANCEL BUTTON DIALOG
  onCancel(){
    this.router.navigate(['dashboard/active'])
  }

  //EDIT BUTTON
  onEditProcess(){
    this.uploadSumariado();
    if(this.dataDocument.length > 0){
      this.uploadFile(this.dataDocument, this.dataDocumentStorage)
      this.uploadDocument(this.dataDocument)
    }
    
    this.router.navigate(['dashboard/active'])
  }

  onAddSumaradio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(SumariadoDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){
          this.addRowData(result.data)

        }
      }
    );
  }

  addRowData(row_obj: Sumariado){
    var index = this.dataSumariado.findIndex(x => x.ci==row_obj.ci); 
    index === -1 ? this.dataSumariado.push(row_obj) : console.log("object already exists");
    this.table.renderRows();
  }

  onSelectDocument(){
    let documento: Documento;
    let documentoStorage: DocumentoStorage;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DocumentDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){
          console.log(result.data.archivo)
          let date: Date = new Date();
          documento = {
            nombre: "Doc#" + (this.dataDocument.length+1) + ": "+ result.data.tipo,
            n_cite: "1",
            tipo: result.data.tipo,
            fecha_registro: date,
            fecha_modificacion: date,
            id_proceso: this.id_proceso,
            n_correspondencia: "1",
            ruta: "./uploads/"+this.sumariante.nombre,
            usuario_registro: this.sumariante.nombre,
            estado: "activo",
            id_usuario: this.sumariante.id_usuario,
            id_perfil: this.sumariante.id_perfil,
            ci: this.sumariante.ci,
            id_tipo_documento: result.data.id_tipo,
          }

          documentoStorage = {
            nombre: documento.nombre,
            file: result.data.archivo
          }
          this.addRowDataDocument(documento)
          this.addRowDataDocumentStorage(documentoStorage)
        }
      }
    );
  }

  addRowDataDocument(row_obj: Documento){
    var index = this.dataDocument.findIndex(x => x.nombre==row_obj.nombre); 
    index === -1 ? this.dataDocument.push(row_obj) : console.log("object already exists");
    this.docTable.renderRows();
  }

  addRowDataDocumentStorage(row_obj: DocumentoStorage){
    var index = this.dataDocumentStorage.findIndex(x => x.nombre==row_obj.nombre); 
    index === -1 ? this.dataDocumentStorage.push(row_obj) : console.log("object already exists");
  }

  uploadSumariado(){
    let procesados:Procesado[] = []
    this.dataSumariado.forEach(x => {
      procesados.push({
        id_procesado: 0,
        id_proceso: this.id_proceso,
        id_sumariado: x.id_sumariado,
        id_usuario: this.sumariante.id_usuario,
        id_perfil: this.sumariante.id_perfil,
        ci: this.sumariante.ci
      })
    });
    let httpReqs = procesados
    .map(i => 
        this.procesadoService.uploadProcesado(i)
        .pipe(catchError(err => of({err})))
        );
    
    concat(...httpReqs).subscribe()
  }
  
  uploadFile(doc: Documento[], docStorage: DocumentoStorage[]){
    var formDatas: FormData[] = []
    docStorage.forEach(
      docS => {
        var index = doc.findIndex(x => x.nombre==docS.nombre); 
        let formData = new FormData();
        let fileExtension:string = docS.file!.name.split('.').pop() || "";
        let fileName:string = doc[index].usuario_registro! + '-Documento' + doc[index].tipo! + '.'+fileExtension
        formData.append('myFile', docStorage[index].file!, fileName)
        formDatas.push(formData)
      }
    )

    let httpReqs = formDatas
    .map(fileS => 
      this.documentoService.postDocumentosArchivo(fileS).pipe(catchError(err => of({err})))
    );

    concat(...httpReqs).subscribe()
    
  }

  uploadDocument(doc: Documento[]){
    
    let httpReqs = doc
    .map(i => 
        this.documentoService.postDocumentosDB(i)
        .pipe(catchError(err => of({err})))
        );
    
    concat(...httpReqs).subscribe()
  }

  getProcesados(){
    this.procesadoService.getProcesadosById(this.id_proceso).subscribe(res =>{
      this.dataSumariado = res
    })

  }

  getDocuments(){
    this.documentoService.getDocuments(this.id_proceso).subscribe(
      res =>{
        this.dataDocument = res
      }
    )
  }

  deleteDocument(row:any){
    this.dataDocument.splice(this.dataDocument.indexOf(row), 1);
    this.docTable.renderRows();
  }
}
