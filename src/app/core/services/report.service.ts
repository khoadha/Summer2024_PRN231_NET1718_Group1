import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AddReportDto, GetReportDto, UpdateReportDto } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'Reports';

  constructor(private http: HttpClient) {}

  getReports(): Observable<GetReportDto[]> {
    return this.http.get<GetReportDto[]>(`${this.APIUrl}`);
  }

  getReportsByUserId(userId: string): Observable<GetReportDto[]> {
    return this.http.get<GetReportDto[]>(
      `${this.APIUrl}/user?userId=${userId}`
    );
  }

  getReportById(id: number): Observable<GetReportDto> {
    return this.http.get<GetReportDto>(`${this.APIUrl}/${id}`);
  }

  addReport(dto: AddReportDto): Observable<GetReportDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<GetReportDto>(`${this.APIUrl}`, dto, httpOptions);
  }

  updateReport(id: number, dto: UpdateReportDto): Observable<GetReportDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<GetReportDto>(
      `${this.APIUrl}/${id}`,
      dto,
      httpOptions
    );
  }
}
