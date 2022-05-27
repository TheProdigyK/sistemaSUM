import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
