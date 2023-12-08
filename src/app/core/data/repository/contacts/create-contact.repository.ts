import { environment } from 'src/environments/environment';
import { ContactResponse } from './contact.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class CreateContactRepository {
  constructor(private http: HttpClient) {}

  createContact(param: any): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${environment.URLBase}contact`, param);
  }
}
