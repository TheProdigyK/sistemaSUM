import { TipoDocumento } from './../models/tipo_documento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Documento } from '../models/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private gURL = environment.URL + "/recurso" + "/document"
  private pURL = environment.URL + "/evento" + "/document"

  constructor(
    private http: HttpClient
  ) { }

  getTipoDocumento(){
    return this.http.get<TipoDocumento[]>(`${this.gURL}`)
  }

  getDocuments(id_proceso: number){
    return this.http.get<Documento[]>(`${this.gURL}/${id_proceso}`)
  }

  postDocumentosDB(doc: Documento){
    return this.http.post(`${this.pURL}`, doc)
  }

  postDocumentosArchivo(formData: FormData){
    return this.http.post(`${this.pURL}/upload`,formData)
  }
}
