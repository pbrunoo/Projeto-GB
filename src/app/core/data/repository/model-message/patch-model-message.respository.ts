import { ModelMessageResponse } from './model-message.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class PatchModelMessageRepository {
  constructor(private http: HttpClient) {}

  activeOrDesactive(param: any): Observable<ModelMessageResponse> {
    const id = param.id;
    return this.http.patch<ModelMessageResponse>(`${environment.URLBase}message-template/${id}/active`, param.status);
  }
}
