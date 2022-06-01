import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sumariado } from '../models/sumariado';

@Injectable({
  providedIn: 'root'
})
export class SumariadoService {
  
  private gURL = environment.URL + "/recurso" + "/sumariado"
  private pURL = environment.URL + "/evento" + "/sumariado"

  constructor(
    private http: HttpClient
  ) { }

  postSendEmailById(id_sumariado: number){
    return this.http.get(`${this.gURL}/email/${id_sumariado}`)
  }

  getSumariadosByQuery(queryCI: string){
    return this.http.get<Sumariado[]>(`${this.gURL}/${queryCI}`)
  }
}
