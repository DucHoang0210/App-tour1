import { RegisterComponent } from '../component/register/register.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseURL = "http://localhost:8080/api/**";



  constructor( private httpClient: HttpClient) { }

  createEmployee(register: Register): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, register);
  }
}
