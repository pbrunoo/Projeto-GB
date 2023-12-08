import { ModelMessageResponse } from './model-message.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class DeleteModelMensagemRepository {
  constructor(private http: HttpClient) {}

  deleteModelMessage(param: string): Observable<ModelMessageResponse> {
    return this.http.delete<ModelMessageResponse>(`${environment.URLBase}message-template/${param}`);
  }
}
