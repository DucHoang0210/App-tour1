import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(username: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login',{username:username,password:password},{observe: 'response'});
  }

  getUser( ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:8080/api/auth/get/user',{headers, observe: 'response'});
  }
}
