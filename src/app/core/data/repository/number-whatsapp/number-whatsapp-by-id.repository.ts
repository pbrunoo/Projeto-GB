import { NumberWhatsappInterface } from './../../../model/number-whatsapp/number-whatsapp.model';
import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })
export class NumberWhatsappByIdRepository {
  constructor(private http: HttpClient) {
  }

  getNumberWhatsappById(param: any): Observable<NumberWhatsappInterface> {
    return this.http.get<NumberWhatsappInterface>(`${environment.URLBase}group/byid/${param}`);
  }
}
