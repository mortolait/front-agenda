import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Appointment, Appointments } from '../model/appointment.model';
import { environment } from 'src/environments/environment';

const API = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  list!: Appointments;
  typesService!: any;

  get(): Observable<Appointments> {
    return this.httpClient.get<Appointments>(`${API}/appointments`);
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(`${API}/appointments`, appointment);
  }
  
  getTypeService(): Observable<any> {
    return this.httpClient.get<any>(`${API}/typeServices`);
  }

  createService(){
    return this.httpClient.post<any>(`${API}/typeServices`,{name:'teste'});
  }

}
