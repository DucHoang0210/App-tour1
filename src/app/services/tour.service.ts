import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tour} from '../models/tour';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private baseUrl="http://localhost:8080/api/tour";
  constructor(private httpClient : HttpClient) { }

  getAllTours(): Observable<Tour[]> {
    return this.httpClient.get<Tour[]>(`${this.baseUrl}/viewTour`);
  }
  getTourById(tourID : number): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/viewDetailTour/${tourID}`);

  }
  getImageDetail(tourID : number): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/viewTourImages/${tourID}`);
  }
  getItinerary(tourID : number): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/viewItinerary/${tourID}`);
  }



}
