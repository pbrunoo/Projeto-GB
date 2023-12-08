import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { botsGreentingResponse } from './bots-greeting.entity';

@Injectable({providedIn:'root'})

export class PatchBotsGreetingRepository {
  constructor(private http: HttpClient) {}

  activeOrDesactive(param: any): Observable<botsGreentingResponse> {
    const id = param.id;
    console.log(param)
    return this.http.patch<botsGreentingResponse>(`${environment.URLBase}message-whatsapp/${id}/active`, param.status);
  }
}
