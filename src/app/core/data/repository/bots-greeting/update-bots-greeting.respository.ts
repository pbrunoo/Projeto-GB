import { botsGreentingResponse } from './bots-greeting.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class UpdateBotsGreetingRepository {
  constructor(private http: HttpClient) {}

  updateBotsGreeting(param: any): Observable<botsGreentingResponse> {

    return this.http.put<botsGreentingResponse>(`${environment.URLBase}message-whatsapp/${param.id}`, param);
  }
}
