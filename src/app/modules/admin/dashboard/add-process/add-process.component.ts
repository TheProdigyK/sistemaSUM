import { DocumentoSISDOC } from './../../../../models/documentoSISDOC';
import { SumariadoCrearDialogComponent } from './sumariado-crear-dialog/sumariado-crear-dialog.component';
import { DocSisCorrespondenciaDialogComponent } from './doc-sis-correspondencia-dialog/doc-sis-correspondencia-dialog.component';
import { RemoveRowDialogComponent } from './remove-row-dialog/remove-row-dialog.component';
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
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.scss']
})


export class AddProcessComponent implements OnInit {

  //CONSTANTE TABLA DOCUMENTOS
  displayedColumns: string[] = ['n_correspondencia' , 'n_cite', 'nombre', 'referencia', 'actions'];
  //dataDocument: Documento[] = [];
  dataDocumento!: MatTableDataSource<Documento>;
  dataDocumentStorage: DocumentoStorage[] = [];
  @ViewChild('documentoPaginator') documentoPaginator!: MatPaginator;
  @ViewChild(MatSort) sortDocumento!: MatSort;

  //CONSTANTE TABLA SUMARIADOS
  sumariadoColumns: string[] = ['id_sumariado', 'ci', 'apellido', 'direccion', 'actions'];
  //dataSumariado: Sumariado[] = []
  dataSumariado!: MatTableDataSource<Sumariado>;
  submit_dataSumariado: Sumariado[] = []
  delete_dataSumariado: Sumariado[] = []
  @ViewChild('sumariadoPaginator') sumariadoPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //TOKEN USER
  token = localStorage.getItem('token');
  public sumariante!: User

  //DATOS OBTENIDOS DE UNA VISTA ANTERIOR
  id_proceso!: number;
  nombre_proceso!: string;

  //NOMBRE PROCESO (VISTA)
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
    //SET VALORES DE UNA VISTA ANTERIOR
    this.id_proceso = JSON.parse(this.route.snapshot.paramMap.get('id_proceso') || "");
    this.nombre_proceso = JSON.parse(this.route.snapshot.paramMap.get('nombreProceso') || "");

    //SET NOMBRE PROCESO VISTA
    this.nProceso.setValue(this.nombre_proceso)

    //DECODIFICANDO TOKEN EN LA CLASE SUMARIANTE
    this.sumariante = decode(this.token || "");
    console.log(this.id_proceso)
    this.getProcesados()
    this.getDocuments()
  }

  //CANCEL BUTTON
  onCancel(){
    this.router.navigate(['dashboard/active'])
  }

  //EDIT BUTTON
  onEditProcess(){
    this.uploadSumariado();
    if(this.dataDocumento.data.length > 0){
      this.uploadFile(this.dataDocumento.data)
      this.uploadDocument(this.dataDocumento.data)
    }
    
    this.router.navigate(['dashboard/active'])
  }

  //DIALOG CREAR SUMARIADO
  onCreateSumaradio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SumariadoCrearDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'success'){
          //this.addRowData(result.data)
        }
      }
    );
  }

  //DIALOG BUSCAR SUMARIADO
  onSearchSumaradio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(SumariadoDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){
          console.log('result: ',result.data)
          this.addRowData(result.data)
          this.dataSumariado.paginator = this.sumariadoPaginator;
          this.dataSumariado.sort = this.sort;
        }
      }
    );
  }

  //AñADIR SUMARIADO A LA TABLA (VISTA EDITAR PROCESO)
  addRowData(row_obj: Sumariado){
    console.log(row_obj)
    var index = this.dataSumariado.data.findIndex(x => x.ci==row_obj.ci); 
    if(index === -1){
      this.dataSumariado.data.push(row_obj)
      this.submit_dataSumariado.push(row_obj)
    }else{
      console.log("object already exists");      
    }
    //index === -1 ? this.dataSumariado.push(row_obj) : console.log("object already exists");
    this.table.renderRows();
  }

  //SIS CORRESPONDENCIA BUTTON
  onSelectDocument_SisCorrespondencia(){
    let documento: Documento;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(DocSisCorrespondenciaDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){
          let documentoSISDOC:DocumentoSISDOC = result.data
          let date: Date = new Date();
          const timestamp = Date.now();

          documento = {
            n_cite: documentoSISDOC.docreg_cite,
            fecha_registro: date,
            fecha_modificacion: date,
            id_proceso: this.id_proceso,
            n_correspondencia: documentoSISDOC.nrocorres,
            rutaservidor: "/uploads/"+this.sumariante.nombre+"/"+this.id_proceso,
            rutaservidorSISDOC: documentoSISDOC.documento,
            nombreservidor: this.getdate()+"-"+this.sumariante.nombre+"-"+this.id_proceso+"-"+timestamp+".pdf",
            usuario_registro: this.sumariante.nombre,
            estado: "activo",
            id_usuario: this.sumariante.id_usuario,
            id_perfil: this.sumariante.id_perfil,
            ci: this.sumariante.ci,
            referencia: documentoSISDOC.docreg_referencia
          }

          this.addRowDataDocument(documento)
          this.dataDocumento.paginator = this.documentoPaginator;
          this.dataDocumento.sort = this.sortDocumento;
        }
      
      }
    );    
  }
  
  //DIALOG AñADIR DOCUMENTO DESDE DIRECCION LOCAL
  onSelectDocument(){
    let documento: Documento;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(DocumentDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){
          console.log(result.data.archivo)
          let date: Date = new Date();
          const timestamp = Date.now();
          documento = {
            nombre: result.data.nombreArchivo,
            fecha_registro: date,
            fecha_modificacion: date,
            id_proceso: this.id_proceso,
            rutaservidor: "/uploads/"+this.sumariante.nombre+"/"+this.id_proceso,
            nombreservidor: this.getdate()+"-"+this.sumariante.nombre+"-"+this.id_proceso+"-"+timestamp+".pdf",
            usuario_registro: this.sumariante.nombre,
            estado: "activo",
            id_usuario: this.sumariante.id_usuario,
            id_perfil: this.sumariante.id_perfil,
            ci: this.sumariante.ci,
            referencia: result.data.referenciaArchivo,
            archivoFisico: result.data.archivo
          }

          this.addRowDataDocument(documento)
          this.dataDocumento.paginator = this.documentoPaginator;
          this.dataDocumento.sort = this.sortDocumento;
        }
      }
    );
  }

  //AñADIR DOCUMENTO A LA TABLA DE LA VISTA EDITAR PROCESO
  addRowDataDocument(row_obj: Documento){
    if(row_obj.nombre){
      var index = this.dataDocumento.data.findIndex(x => x.nombre==row_obj.nombre);
    }else{
      var index = this.dataDocumento.data.findIndex(x => x.n_cite==row_obj.n_cite);
    }
    
    index === -1 ? this.dataDocumento.data.push(row_obj) : console.log("object already exists");
    this.docTable.renderRows();
  }

  addRowDataDocumentStorage(row_obj: DocumentoStorage){
    var index = this.dataDocumentStorage.findIndex(x => x.nombre==row_obj.nombre); 
    index === -1 ? this.dataDocumentStorage.push(row_obj) : console.log("object already exists");
  }

  /*
      METODOS DE SUBIDA AL BACKEND DE DATOS (VECTORES)
  */

  uploadSumariado(){
    let procesados:Procesado[] = []
    this.dataSumariado.data.forEach(x => {
      procesados.push({
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
  
  uploadFile(doc: Documento[]){
    //FORMA 1 DE SUBIR ARCHIVOS
    /*var formDatas: FormData[] = []
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

    concat(...httpReqs).subscribe()*/

    //FORMA 2 (RECOMENDABLE)

    var formData = new FormData()
    var docSISDOC:Documento[]
    for (let index=0; index < doc.length; index++){
      const docS = doc[index]
      if(docS.archivoFisico != null){
        let fileName:string = docS.nombreservidor || ""
        console.log(fileName)
        formData.append('myFiles', docS.archivoFisico!, fileName)
      }else if(docS.rutaservidorSISDOC){
        this.documentoService.downloadDocumentoSISDOC_2(encodeURIComponent(docS.rutaservidorSISDOC)).subscribe(
          (res) =>{
            // var uri = window.URL.createObjectURL(res);
            // window.open(uri)
            var formDataSISDOC = new FormData()
            var file = new File([res], "tempname");
            let fileName:string = docS.nombreservidor || ""
            console.log(fileName)
            formDataSISDOC.append('myFiles', res, fileName)
            this.documentoService.postDocumentosArchivo(formDataSISDOC).subscribe()
        })
      }else{
        console.log("documento ya registrado")
      }
    }
    if(formData){
      this.documentoService.postDocumentosArchivo(formData).subscribe()
    }else{
      console.log("formDATA vacio")
    }
    
  }

  uploadDocument(doc: Documento[]){
    
    let httpReqs = doc
    .map(i => 
        this.documentoService.postDocumentosDB(i)
        .pipe(catchError(err => of({err})))
        );
    
    concat(...httpReqs).subscribe()
  }

  viewDocument(row:Documento){
    if(row.rutaservidorSISDOC){
      let uri:string = row.rutaservidorSISDOC
      window.open(uri)
    }else if(row.archivoFisico){
      var uri = window.URL.createObjectURL(row.archivoFisico);
      window.open(uri)
    } else{
      console.log("ambas condiciones son falsas")
    }

    

    // let text2:string = '/uploads/MJ39/16'
    // this.documentoService.downloadDocumentoSISSUM(encodeURIComponent(text2)).subscribe(
    //   res => {
    //     console.log(res)
    //   }
    // )    

  }

  /*
      METODOS GET PARA OBTENER DATOS DEL BACKEND
  */
  getProcesados(){
    this.procesadoService.getProcesadosById(this.id_proceso).subscribe(res =>{
      this.dataSumariado = new MatTableDataSource(res)
      this.dataSumariado.paginator = this.sumariadoPaginator;
      this.dataSumariado.sort = this.sort;
    })

  }

  getDocuments(){
    this.documentoService.getDocuments(this.id_proceso).subscribe(
      res =>{
        this.dataDocumento = new MatTableDataSource(res)
        this.dataDocumento.paginator = this.documentoPaginator;
        this.dataDocumento.sort = this.sortDocumento;
      }
    )
  }

  /*
      METODOS DE ELIMINACION DE REGISTRO
  */
  deleteDocument(row:Documento){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      documentoSeleccionado: row,
      id_proceso: this.id_proceso,
      nombreItem: 'DOCUMENTO'};
    this.dialog.open(RemoveRowDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result == 'yes'){
          this.dataDocumento.data.splice(this.dataDocumento.data.indexOf(row), 1);
          this.docTable.renderRows();
          this.dataDocumento.paginator = this.documentoPaginator;
          this.dataDocumento.sort = this.sort;
        }
      }
    );
  }

  //ELIMINAR UN SUMARIADO DE LA TABLA (VISTA EDITAR PROCESO)
  deleteSumariado(row:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      sumariadoSeleccionado: row,
      id_proceso: this.id_proceso,
      nombreItem: 'SUMARIADO'};
    this.dialog.open(RemoveRowDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result == 'yes'){
          console.log("yes")
          this.dataSumariado.data.splice(this.dataSumariado.data.indexOf(row), 1);
          this.table.renderRows();
          this.dataSumariado.paginator = this.sumariadoPaginator;
          this.dataSumariado.sort = this.sort
        }
      }
    );
  }

  getdate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
  
    let today_str = dd+mm+yyyy;
    return today_str
  }

}
