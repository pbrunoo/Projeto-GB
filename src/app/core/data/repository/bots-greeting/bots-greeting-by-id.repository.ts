import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { botsGreentingResponse } from './bots-greeting.entity';

@Injectable({providedIn: 'root' })

export class BotGreetingByIdRepository {
  constructor(private http: HttpClient) {
  }

  getById(param: any): Observable<botsGreentingResponse> {
    return this.http.get<botsGreentingResponse>(`${environment.URLBase}message-whatsapp/${param}`);
  }
}
