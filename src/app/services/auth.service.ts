import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
const baseUrl = 'http://localhost:8080/api/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }
  get(ci: any): Observable<User> {
    return this.http.get(`${baseUrl}/${ci}`);
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