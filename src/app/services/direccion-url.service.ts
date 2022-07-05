import { EnlaceObj } from './../models/enlaceObj';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DireccionURLService {

  private gURL = environment.URL + "/recurso" + "/process"
  private pURL = environment.URL + "/evento" + "/enlace"

  constructor(
    private http: HttpClient
  ) { }

  postCreateUrl(urlO: EnlaceObj){
    return this.http.put(`${this.pURL}`, urlO)
  }
}
