import { ModelMessageResponse } from './model-message.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class UpdateModelMessageRepository {
  constructor(private http: HttpClient) {}

  updateBotsModelMessage(param: any): Observable<ModelMessageResponse> {

    return this.http.put<ModelMessageResponse>(`${environment.URLBase}message-template/${param.id}`, param);
  }
}
