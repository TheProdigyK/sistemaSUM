import { DocumentoSISDOC } from './../models/documentoSISDOC';
import { TipoDocumento } from './../models/tipo_documento';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  
  updateDocumentoEstado(id: any){
    return this.http.put(`${this.pURL}`,id)
  }

  //SISTEMA DOCUMENTAL
  private sisdoc_gURL = environment.URL_SISDOCUMENTAL
  
  getDocumentosSISDOC(query: string){
    return this.http.get<DocumentoSISDOC[]>(`${this.sisdoc_gURL}/${query}`)
  }

  private gURL_downloadSISDOC = environment.URL + "/recurso" + "/documentDownloadSISDOC"
  private gURL_downloadSISSUM = environment.URL + "/recurso" + "/documentDownloadSISSUM"

  downloadDocumentoSISDOC_2(dir: string){
    return this.http.get(`${this.gURL_downloadSISDOC}/${dir}`, { responseType: 'blob' })
  }

  downloadDocumentoSISSUM(dir: string){
    return this.http.get(`${this.gURL_downloadSISSUM}/${dir}`)
  }


  //FILE
  private gURL_file = environment.URL + "/recurso" + "/documentFile"
  getDocumentFile(id_documento: number){
    return this.http.get(`${this.gURL_file}/${id_documento}`, { responseType: 'blob'})
  } 

  //VISTA SUMARIADO
  private gURL_sumariado = environment.URL + "/recurso" + "/documentSumariado"

  getDocumentsSumariado(id_usuario: number, id_proceso: number){
    //${this.gURL}/download/${dir}
    return this.http.get<Documento[]>(`${this.gURL_sumariado}/${id_usuario}/${id_proceso}`)
  } 

}
