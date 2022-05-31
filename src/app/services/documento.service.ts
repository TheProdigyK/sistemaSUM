import { TipoDocumento } from './../models/tipo_documento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Documento } from '../models/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private URL = environment.URL + "/document"

  constructor(
    private http: HttpClient
  ) { }

  getTipoDocumento(){
    return this.http.get<TipoDocumento[]>(`${this.URL}`)
  }

  getDocuments(id_proceso: number){
    return this.http.get<Documento[]>(`${this.URL}/${id_proceso}`)
  }

  postDocumentosDB(doc: Documento){
    return this.http.post(`${this.URL}`, doc)
  }

  postDocumentosArchivo(formData: FormData){
    return this.http.post(`${this.URL}/upload`,formData)
  }
}
