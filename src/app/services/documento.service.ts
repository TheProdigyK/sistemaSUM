import { TipoDocumento } from './../models/tipo_documento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(
    private http: HttpClient
  ) { }

  getTipoDocumento(){
    return this.http.get<TipoDocumento[]>(`${environment.documentoURL}`)
  }

  postDocumentos(formData: FormData){
    return this.http.post(`${environment.documentoURL}/upload`,formData)
  }
}
