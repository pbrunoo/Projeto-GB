import { CompanyResponse } from './company.entity';
import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })
export class CompanyRepository {
  constructor(private http: HttpClient) {
  }

  getAllCompany(): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(`${environment.URLBase}company/all`);
  }
}
