import { SiblingSharedService } from './../../../../../services/sibling-shared.service';
import { DescargoService } from './../../../../../services/descargo.service';
import { DocDescargo } from './../../../../../models/descargo';
import { DocumentoService } from './../../../../../services/documento.service';
import { Proceso } from 'src/app/models/proceso';
import { Documento } from './../../../../../models/documento';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { DocumentDialogComponent } from '../../add-process/document-dialog/document-dialog.component';
import { catchError, concat, of } from 'rxjs';

@Component({
  selector: 'app-view-documents-dialog',
  templateUrl: './view-documents-dialog.component.html',
  styleUrls: ['./view-documents-dialog.component.scss']
})
export class ViewDocumentsDialogComponent implements OnInit {

  
  documentoColumns: string[] = ['n_correspondencia', 'n_cite', 'nombre', 'referencia', 'actions'];
  dataDocumento!: MatTableDataSource<Documento>;
  @ViewChild(MatPaginator) documentoPaginator!: MatPaginator;
  @ViewChild(MatSort) sortdocumento!: MatSort;

  documentoUploadColumns: string[] = ['nombre', 'referencia', 'fecha_registro', 'actions'];
  dataDocumentoUpload!: MatTableDataSource<DocDescargo>;
  @ViewChild(MatPaginator) documentoUploadPaginator!: MatPaginator;
  @ViewChild(MatSort) sortdocumentoUpload!: MatSort;

  //TOKEN USER
  token = localStorage.getItem('token');
  sumariado!:User

  proceso!:Proceso

  @ViewChild('docTable') docTable!: MatTable<any>;
  constructor(
    // @Inject(MAT_DIALOG_DATA) public dialog_data: any,
    // public dialogRef: MatDialogRef<ViewDocumentsDialogComponent>,
    private documentoService: DocumentoService,
    private descargoServices: DescargoService,
    private siblingSharedService: SiblingSharedService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    //SET VALORES DE UNA VISTA ANTERIOR
        
    if (localStorage.getItem("sumariadoRow_process") === null || localStorage.getItem("sumariadoRow_process") === "undefined") {
      this.proceso =  this.siblingSharedService.getData()
      localStorage.setItem('sumariadoRow_process', JSON.stringify(this.proceso))  
    }else{
      this.proceso = JSON.parse(localStorage.getItem('sumariadoRow_process') || "");
    }

    this.sumariado = decode(this.token || "");
    this.dataDocumentoUpload = new MatTableDataSource() //IMPORTANT

    this.cargarDocumentos()
  }

  ngOnDestroy(){
    localStorage.removeItem("sumariadoRow_process");
  }

  obtenerPDF(row:Documento){
    if(row.archivoFisico){
      console.log("yes archivo fisico")
      var uri = window.URL.createObjectURL(row.archivoFisico);
      window.open(uri)
    } else{
      this.documentoService.getDocumentFile(row.id_documento!).subscribe( res =>{
        var uri = window.URL.createObjectURL(res);
        window.open(uri)
      
      })
      
    }

  }
  obtenerPDFdescargo(row:DocDescargo){
    if(row.archivoFisico){
      console.log("yes archivo fisico")
      var uri = window.URL.createObjectURL(row.archivoFisico);
      window.open(uri)
    } else{
      this.descargoServices.getDescargosFile(row.id_descargo!).subscribe( res =>{
        var uri = window.URL.createObjectURL(res);
        window.open(uri)
      
      })
      
    }

  }

  cargarDocumentos(){
    this.documentoService.getDocumentsSumariado(this.sumariado.id_usuario!, this.proceso.id_proceso!).subscribe(
      doc =>{
        this.dataDocumento = new MatTableDataSource(doc)
        this.dataDocumento.paginator = this.documentoPaginator;
        this.dataDocumento.sort = this.sortdocumento;

    })

    this.descargoServices.getDescargos(this.sumariado.id_usuario!, this.proceso.id_proceso!).subscribe( res => {
      this.dataDocumentoUpload = new MatTableDataSource(res)
      // this.dataDocumento.paginator = this.documentoPaginator;
      // this.dataDocumento.sort = this.sortdocumento;
      // console.log(res)
    })
    
    
  }

  buscarLocalmente(){
    let descargo: DocDescargo;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(DocumentDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){
          let date: Date = new Date();
          const timestamp = Date.now();
          descargo = {
            id_usuario: this.sumariado.id_usuario,
            id_perfil: this.sumariado.id_perfil,
            ci: this.sumariado.ci,
            id_proceso: this.proceso.id_proceso,
            nomdescargo: result.data.nombreArchivo,
            refdescargo: result.data.referenciaArchivo,
            fecha_registro: date,
            rutaservidor: "/uploads/"+this.proceso.usuario_registro+"/"+this.dateTransformFormat() + "/"+this.proceso.id_proceso+"/descargo/"+this.sumariado.nombre,
            nombreservidor: this.getdate()+"-"+this.sumariado.nombre +"-"+this.proceso.usuario_registro+"-"+this.proceso.id_proceso+"-"+timestamp+".pdf",
            usuario_registro: this.sumariado.nombre,
            archivoFisico: result.data.archivo
          }

          console.log(descargo)

          this.addRowDataDocument(descargo)
          // this.dataDocumento.paginator = this.documentoPaginator;
          // this.dataDocumento.sort = this.sortDocumento;
        }
      }
    );
  }

  addRowDataDocument(row_obj: DocDescargo){
    var index = this.dataDocumentoUpload.data.findIndex(x => x.nomdescargo==row_obj.nomdescargo);    
    index === -1 ? this.dataDocumentoUpload.data.push(row_obj) : console.log("object already exists");
    this.docTable.renderRows();
  }


  deleteDocument(row: Documento){

  }

  guardarCambios(){
    this.subirDescargo()
    this.subirArchivo()
  }

  subirDescargo(){
    let httpReqs = this.dataDocumentoUpload.data
    .map(i => 
        this.descargoServices.postDescargos(i)
        .pipe(catchError(err => of({err})))
        );
    
    concat(...httpReqs).subscribe()

  }

  subirArchivo(){
    var doc = this.dataDocumentoUpload.data
    var formData = new FormData()
    for (let index=0; index < doc.length; index++){
      const docS = doc[index]
      if(docS.archivoFisico != null){
        let fileName:string = this.sendProcessInit() +"%"+ docS.nombreservidor || ""
        console.log(fileName)
        formData.append('myFiles', docS.archivoFisico!, fileName)
      }else{
        console.log("documento ya registrado")
      }
    }
    if(formData){
      this.descargoServices.createFileDescargo(formData).subscribe()
    }else{
      console.log("formDATA vacio")
    }

  }


  getdate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
  
    let today_str = dd+mm+yyyy;
    return today_str
  }

  sendProcessInit(){

    let dt:Date = new Date(this.proceso.fecha_registro || "")

    let year  = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day   = dt.getDate().toString().padStart(2, "0");

    return year + month + day
  }

  dateTransformFormat(){

    let dt:Date = new Date(this.proceso.fecha_registro || "")

    let year  = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day   = dt.getDate().toString().padStart(2, "0");

    return year + '-' + month + '-' + day
  }

}
