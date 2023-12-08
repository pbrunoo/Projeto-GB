import { CompanyResponse } from './company.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class UpdateCompanyRepository {
  constructor(private http: HttpClient) {}

  updateCompany(param: any): Observable<CompanyResponse> {
    const id = param.id;
    delete param.id;
    return this.http.put<CompanyResponse>(`${environment.URLBase}company/${id}`, param);
  }
}
