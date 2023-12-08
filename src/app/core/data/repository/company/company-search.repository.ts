import { CompanyResponse } from './company.entity';
import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })
export class CompanySearchRepository {
  constructor(private http: HttpClient) {
  }

  getCompany(param: string): Observable<CompanyResponse> {
    console.log(param)
    return this.http.get<CompanyResponse>(`${environment.URLBase}company?term=${param}`);
  }
}
