import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root'})

export class NumberWhatsappRepository {
  constructor(private http: HttpClient) {}

  getAllNumberWhatsapp(): Observable<NumberWhatsappRepository> {
    return this.http.get<NumberWhatsappRepository>(`${environment.URLBase}group/all`);
  }
}
