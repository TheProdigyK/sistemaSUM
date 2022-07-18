import { Documento } from './../../../../models/documento';
import { DocumentoService } from './../../../../services/documento.service';
import { UrlDialogComponent } from './url-dialog/url-dialog.component';
import { Sumariado } from 'src/app/models/sumariado';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProcesadoService } from 'src/app/services/procesado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TipoDocumento } from 'src/app/models/tipo_documento';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-generate-url',
  templateUrl: './generate-url.component.html',
  styleUrls: ['./generate-url.component.scss']
})
export class GenerateUrlComponent implements OnInit {

  sumariadoColumns: string[] = ['select', 'ci', 'apellido', 'direccion'];
  dataSumariado!: MatTableDataSource<Sumariado>;
  sumariadoSelection = new SelectionModel<Sumariado>(true, []);
  @ViewChild('sumariadoPaginator') sumariadoPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documentTableColumns: string[] = ['select', 'n_correspondencia', 'n_cite', 'nombre', 'referencia'];
  //dataDocument: Documento[] = [];
  dataDocumento!: MatTableDataSource<Documento>;
  documentSelection = new SelectionModel<Documento>(true, []);
  numRows!: number
  @ViewChild('documentoPaginator') documentoPaginator!: MatPaginator;
  @ViewChild(MatSort) documentoSort!: MatSort;


  nProceso = new FormControl('', Validators.required);
  selectedTipoDocumento = new FormControl('', Validators.required);


  id_proceso!: number;
  nombre_proceso!: string;
  sumariado_seleccionado!: Sumariado;

  TipoDocumentos!: TipoDocumento[]


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

    //this.typeDocuments()
    this.getProcesados()
    this.getDocuments()

  }

  selectHandler(row: Sumariado) {
    if (!this.sumariadoSelection.isSelected(row)) {
      this.sumariadoSelection.clear();
    }
    this.sumariadoSelection.toggle(row);

  }

  onCancel(){
    this.router.navigate(['dashboard/active'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSumariado.filter = filterValue.trim().toLowerCase();

    if (this.dataSumariado.paginator) {
      this.dataSumariado.paginator.firstPage();
    }
  }

  applyFilterDocumento(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataDocumento.filter = filterValue.trim().toLowerCase();

    if (this.dataSumariado.paginator) {
      this.dataSumariado.paginator.firstPage();
    }
  }

  //DIALOG GENERAR ENLACE
  onGenerarEnlace(){
    console.log(this.documentSelection.selected)
    console.log(this.sumariadoSelection.selected)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {sumariadoSeleccionado: this.sumariadoSelection.selected[0], documentSelected: this.documentSelection.selected, id_proceso: this.id_proceso};
    this.dialog.open(UrlDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){  
        }
      }
    );
  }

  //VOLVER A PROCESOS ACTIVOS
  onTerminarProceso(){
    this.router.navigate(['dashboard/active'])
    
  }

  //METODOS DE FUNCIONAMIENTO CHECKBOX
  ////1
  isAllSelected() {
    const numSelected = this.documentSelection.selected.length;
    // const numRows = this.dataDocumento.data.length;
    return numSelected === this.numRows;
  }
  
  ////2
  masterToggle() {
    if (this.isAllSelected()) {
      this.documentSelection.clear();
      return;
    }

    this.documentSelection.select(...this.dataDocumento.data);
  }

  ////3
  checkboxLabel(row?: Documento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.documentSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.nombre}`;
  }

  onSumariadoSeleccionado(list:MatListOption[]){
    this.sumariado_seleccionado = list.map((item: { value: any; }) => item.value)[0];
    console.log(this.sumariado_seleccionado.nombre)
    
  }

  //GET TYPE DOCUMENTS
  typeDocuments(){
    this.documentoService.getTipoDocumento().subscribe(
      data =>{
        this.TipoDocumentos = data
      }
    )
  }

  getProcesados(){
    this.procesadoService.getProcesadosById(this.id_proceso).subscribe(res =>{
      this.dataSumariado = new MatTableDataSource(res);
      this.dataSumariado.paginator = this.sumariadoPaginator;
      this.dataSumariado.sort = this.sort;

    })

  }

  onGetUrl(row:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {id_sumariado: row.id_sumariado, documentSelected: this.documentSelection.selected};
    this.dialog.open(UrlDialogComponent,dialogConfig).afterClosed().subscribe(
      result => {
        if(result.event == 'add'){  
        }
      }
    );
  }

  //GET DOCUMENTS
  getDocuments(){
    this.documentoService.getDocuments(this.id_proceso).subscribe(
      res =>{
      this.dataDocumento = new MatTableDataSource(res);
      this.numRows = this.dataDocumento.data.length;
      this.dataDocumento.paginator = this.documentoPaginator;
      this.dataDocumento.sort = this.documentoSort;
      }
    )
  }
}
