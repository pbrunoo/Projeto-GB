import { ModelMessageResponse } from './model-message.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class CreateModelMessagegRepository {
  constructor(private http: HttpClient) {}

  createBotsModelMessage(param: any): Observable<ModelMessageResponse> {
    return this.http.post<ModelMessageResponse>(`${environment.URLBase}message-template`, param);
  }
}
