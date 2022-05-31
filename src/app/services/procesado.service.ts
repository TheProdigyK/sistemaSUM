import { Sumariado } from './../models/sumariado';
import { Procesado } from './../models/procesado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcesadoService {

  private URL = environment.URL + "/procesado"

  constructor(
    private http: HttpClient
  ) { }

  getProcesadosById(id_proceso: number){
    return this.http.get<Sumariado[]>(`${this.URL}/${id_proceso}`)
  }

  uploadProcesado(procesado: Procesado){
    return this.http.post<Procesado[]>(`${this.URL}`, procesado)
  }
}
