import { Sumariado } from './../models/sumariado';
import { Procesado } from './../models/procesado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcesadoService {

  private gURL = environment.URL + "/recurso" + "/procesado"
  private pURL = environment.URL + "/evento" + "/procesado"

  constructor(
    private http: HttpClient
  ) { }

  getProcesadosById(id_proceso: number){
    return this.http.get<Sumariado[]>(`${this.gURL}/${id_proceso}`)
  }

  uploadProcesado(procesado: Procesado){
    return this.http.post<Procesado[]>(`${this.pURL}`, procesado)
  }
}
