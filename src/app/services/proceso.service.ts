import { Proceso } from './../models/proceso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private gURL = environment.URL + "/recurso" + "/process"
  private pURL = environment.URL + "/evento" + "/process"

  constructor(
    private http: HttpClient
  ) { }

  archivarProceso(proceso: Proceso){
    return this.http.put(`${this.pURL}/${proceso.id_proceso}`,{})
  }

  getAllProcess(sumariante: User){
    return this.http.get<Proceso[]>(`${this.gURL}/${sumariante.id_usuario}/activo`)
  }

  createProcess(proceso: Proceso){
    return this.http.post(`${this.pURL}`, proceso)
  }

  getProcessById(id_user: number){
    return this.http.get(`${this.gURL}/${id_user}/archivado`)
  }
  
}
