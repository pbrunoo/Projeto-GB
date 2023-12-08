import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelMessageResponse } from './model-message.entity';
@Injectable({providedIn: 'root' })

export class ModelMessageRepository {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ModelMessageResponse> {
    return this.http.get<ModelMessageResponse>(`${environment.URLBase}message-template/all`);
  }
}
