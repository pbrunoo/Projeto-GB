import { NumberWhatsappResponse } from './number-whatsapp.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class CreateNumberWhatsappRepository {
  constructor(private http: HttpClient) {}

  createNumberWhatsapp(param: any): Observable<NumberWhatsappResponse> {
    return this.http.post<NumberWhatsappResponse>(`${environment.URLBase}group`, param);
  }
}
