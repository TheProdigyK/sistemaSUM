import { Proceso } from './../../../../../models/proceso';
import { DescargoService } from './../../../../../services/descargo.service';
import { Sumariado } from './../../../../../models/sumariado';
import { DocDescargo } from './../../../../../models/descargo';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sumariado-descargos-dialog',
  templateUrl: './sumariado-descargos-dialog.component.html',
  styleUrls: ['./sumariado-descargos-dialog.component.scss']
})
export class SumariadoDescargosDialogComponent implements OnInit {

  descargoColumns: string[] = ['nombre', 'referencia', 'fecha_registro', 'actions'];
  dataDescargo!: MatTableDataSource<DocDescargo>;
  @ViewChild(MatPaginator) sumariadoPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  isLoading = true
  sumariado!:Sumariado
  proceso!:Proceso

  constructor(
    public dialogRef: MatDialogRef<SumariadoDescargosDialogComponent>,
    private descargoServices: DescargoService,
    @Inject(MAT_DIALOG_DATA) public dialog_data: any

  ) { }

  ngOnInit(): void {
    this.sumariado = this.dialog_data['sumariado']
    this.proceso = JSON.parse(localStorage.getItem('row_process') || "");
    console.log(this.sumariado)
    this.cargarDescargos()
  }

  onReturn(){
    this.dialogRef.close({event:"cancel"});
  }
  verDescargoFile(row: DocDescargo){
    

  }

  cargarDescargos(){
    this.descargoServices.getDescargos(this.sumariado.id_usuario!, this.proceso.id_proceso!).subscribe( res => {
      this.dataDescargo = new MatTableDataSource(res)
      this.isLoading = false
      // this.dataDocumento.paginator = this.documentoPaginator;
      // this.dataDocumento.sort = this.sortdocumento;
      // console.log(res)
    })
  }

}
