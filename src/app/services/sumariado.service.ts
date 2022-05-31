import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SumariadoService {
  
  private URL = environment.URL + "/sumariado"

  constructor(
    private http: HttpClient
  ) { }

  postSendEmailById(id_sumariado: number){
    return this.http.get(`${this.URL}/email/${id_sumariado}`)
  }
}
