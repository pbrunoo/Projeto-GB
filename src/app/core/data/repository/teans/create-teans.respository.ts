import { TeansResponse } from './teans.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class CreateTeansRepository {
  constructor(private http: HttpClient) {}

  createTeans(param: any): Observable<TeansResponse> {
    return this.http.post<TeansResponse>(`${environment.URLBase}team`, param);
  }
}
