import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + "Setup";

  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/users`)
  }

  sendEmail(sendEmailRequestDto: any) {
    return this.http.post(`${this.APIUrl}/send-email`, sendEmailRequestDto)
  }
}
