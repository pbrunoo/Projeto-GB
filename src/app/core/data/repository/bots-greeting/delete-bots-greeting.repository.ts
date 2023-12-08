import { botsGreentingResponse } from './bots-greeting.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class DeleteBotsGreetingRepository {
  constructor(private http: HttpClient) {}

  deleteBotGreeting(param: string): Observable<botsGreentingResponse> {
    return this.http.delete<botsGreentingResponse>(`${environment.URLBase}message-whatsapp/${param}`);
  }
}
