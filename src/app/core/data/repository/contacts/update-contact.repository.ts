import { environment } from 'src/environments/environment';
import { ContactResponse } from './contact.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class UpdateContactRepository {
  constructor(private http: HttpClient) {}

  updateContact(param: any): Observable<ContactResponse> {
    return this.http.put<ContactResponse>(`${environment.URLBase}contact/${param.id}`, param);
  }
}
