import { Proceso } from './../models/proceso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  constructor(
    private http: HttpClient
  ) { }

  archivarProceso(proceso: Proceso){
    return this.http.put(`${environment.processURL}/${proceso.id_proceso}`,{})
  }

  getAllProcess(sumariante: User){
    return this.http.get<Proceso[]>(`${environment.processURL}/${sumariante.id_usuario}/activo`)
  }

  createProcess(proceso: Proceso){
    return this.http.post(`${environment.processURL}`, proceso)
  }
  
}
