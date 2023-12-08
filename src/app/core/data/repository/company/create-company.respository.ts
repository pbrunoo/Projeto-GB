import { CompanyResponse } from './company.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class CreateCompanyRepository {
  constructor(private http: HttpClient) {}

  createCompany(param: any): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(`${environment.URLBase}company`, param);
  }
}
