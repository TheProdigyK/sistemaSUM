import { Proceso } from './../models/proceso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private URL = environment.URL + "/process"
  constructor(
    private http: HttpClient
  ) { }

  archivarProceso(proceso: Proceso){
    return this.http.put(`${this.URL}/${proceso.id_proceso}`,{})
  }

  getAllProcess(sumariante: User){
    return this.http.get<Proceso[]>(`${this.URL}/${sumariante.id_usuario}/activo`)
  }

  createProcess(proceso: Proceso){
    return this.http.post(`${this.URL}`, proceso)
  }

  getProcessById(id_user: number){
    return this.http.get(`${this.URL}/${id_user}/archivado`)
  }
  
}
