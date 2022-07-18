import { DocDescargo } from './../models/descargo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescargoService {

  private gURL = environment.URL + "/recurso" + "/descargo"
  private pURL = environment.URL + "/evento" + "/descargo"

  constructor(
    private http: HttpClient
  ) { }

  postDescargos(documento: DocDescargo){
    return this.http.post(`${this.pURL}`,documento)
  }

  createFileDescargo(formData: FormData){
    return this.http.post(`${this.pURL}/upload`,formData)
  }

  getDescargos(id_usuario: number, id_proceso: number){
    return this.http.get<DocDescargo[]>(`${this.gURL}/${id_usuario}/${id_proceso}`)
  }

  private gURL_file = environment.URL + "/recurso" + "/descargoFile"

  getDescargosFile(id_descargo: number){
    return this.http.get(`${this.gURL_file}/${id_descargo}`, {responseType: 'blob'})
  }
}

