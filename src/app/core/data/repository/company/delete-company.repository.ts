import { CompanyResponse } from './company.entity';
import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })

export class DeleteCompanyRepository {
  constructor(private http: HttpClient) {
  }

  deleteCompany(param: string): Observable<CompanyResponse> {
    return this.http.delete<CompanyResponse>(`${environment.URLBase}company/${param}`);
  }
}
