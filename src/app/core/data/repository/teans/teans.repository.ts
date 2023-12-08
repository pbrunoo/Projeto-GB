import { TeansResponse } from './teans.entity';
import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })

export class TeansRepository {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<TeansResponse> {
    return this.http.get<TeansResponse>(`${environment.URLBase}team/all`);
  }
}
