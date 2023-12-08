import { TeansResponse } from './teans.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class UpdateTeansRepository {
  constructor(private http: HttpClient) {}

  updateTeans(param: any): Observable<TeansResponse> {

    return this.http.put<TeansResponse>(`${environment.URLBase}team/${param.id}`, param);
  }
}
