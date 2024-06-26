import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Profile, UpdateUsernameDto, UpdatePasswordDto } from '../models/profile';
import { PaymentTransaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'profiles';
  readonly paymentUrl = this.baseUrl + 'Payments';

  constructor(private http: HttpClient) {}

  getProfileByUserId(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.APIUrl + '/' + id);
  }

  checkLoginMethod(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/check-login-method/${id}`);
  }

  updateUserName(id: string, model: UpdateUsernameDto): Observable<any> {
    return this.http.put<any>(`${this.APIUrl}/update-username/${id}`, model);
  }

  updatePassword(id: string, model: UpdatePasswordDto): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/change-password/${id}`, model);
  }

  updateAvatar(userId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.APIUrl}/update-avatar/${userId}`, formData);
  }

  getProfileByEmail(email: string): Observable<Profile> {
    return this.http.get<Profile>(this.APIUrl + '/profile-img/' + email);
  }
}
