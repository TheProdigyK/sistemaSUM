import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
const baseUrl = 'http://localhost:8080/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }
  getUser(nombre: any): Observable<User> {
    return this.http.get(`${baseUrl}/${nombre}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(ci: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${ci}`, data);
  }
  delete(ci: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${ci}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}