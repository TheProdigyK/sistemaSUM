import { Compartida } from './../models/compartida';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../models/funcionario';
import { Persona } from '../models/persona';
import { Sumariado } from '../models/sumariado';

@Injectable({
  providedIn: 'root'
})
export class SumariadoService {
  
  private gURL = environment.URL + "/recurso" + "/sumariado"
  private pURL = environment.URL + "/evento" + "/sumariado"

  //persona
  private pURLusuario = environment.URL + "/evento" + "/usuario"

  //url
  private cgURL = environment.URL + "/evento" + "/compartida"
  private egURL = environment.URL + "/evento" + "/email"

  constructor(
    private http: HttpClient
  ) { }

  postCompartirDocumentos(compartida: Compartida){
    return this.http.post(`${this.cgURL}`, compartida)
  }

  postSendEmail(compartida: Compartida){
    return this.http.post(`${this.egURL}`, compartida)
  }

  getSumariadosByQuery(queryCI: string){
    return this.http.get<Sumariado[]>(`${this.gURL}/${queryCI}`)
  }

  //SISTEMA RRHH
  private rrhh_gURL = environment.URL_SISRRHH

  getSumariadoRRHH(query: string){
    return this.http.get<Funcionario[]>(`${this.rrhh_gURL}/${query}`)
  }

  //TABLA PERSONA Y TABLA USUARIO
  createUserSumariado(nuevoSumariado: Persona){
    return this.http.post<Sumariado>(`${this.pURLusuario}`, nuevoSumariado)
  }
}
