import { TeansResponse } from './teans.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class DeleteTeansRepository {
  constructor(private http: HttpClient) {}

  deleteTeans(param: string): Observable<TeansResponse> {
    return this.http.delete<TeansResponse>(`${environment.URLBase}team/${param}`);
  }
}
