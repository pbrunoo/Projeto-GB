import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TeansResponse } from './teans.entity';

@Injectable({providedIn:'root'})

export class PatchTeansRepository {
  constructor(private http: HttpClient) {}

  activeOrDesactive(param: any): Observable<TeansResponse> {
    const id = param.id;
    return this.http.patch<TeansResponse>(`${environment.URLBase}team/${id}/status`, param.status);
  }
}
