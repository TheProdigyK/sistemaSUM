import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SumariadoService {

  constructor(
    private http: HttpClient
  ) { }

  postSendEmailById(id_sumariado: number){
    return this.http.get(`${environment.sumariadoURL}/email/${id_sumariado}`)
  }
}
