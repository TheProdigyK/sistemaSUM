import { Sumariado } from './../models/sumariado';
import { Procesado } from './../models/procesado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcesadoService {

  constructor(
    private http: HttpClient
  ) { }

  getProcesadosById(id_proceso: number){
    return this.http.get<Sumariado[]>(`${environment.procesadoURL}/${id_proceso}`)
  }

  uploadProcesado(procesado: Procesado){
    return this.http.post<Procesado[]>(`${environment.procesadoURL}`, procesado)
  }
}
