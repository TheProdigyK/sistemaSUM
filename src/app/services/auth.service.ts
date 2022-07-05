import { Persona } from './../models/persona';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Auth } from './../models/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pURL = environment.URL + "/evento"

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token||"") || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

  //SIGN IN USER
  signin(user: Auth){
    return this.http.post(`${this.pURL}/auth`, user)
  }

  private gURL_persona = environment.URL + "/recurso" + "/persona"

  getPersonaByCI(ci: string){
    return this.http.get<Persona>(`${this.gURL_persona}/${ci}`)
  } 

}
