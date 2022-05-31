import { JwtHelperService } from '@auth0/angular-jwt';
import { Auth } from './../models/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.URL

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
    return this.http.post(`${this.URL}/auth`, user)
  }

}
