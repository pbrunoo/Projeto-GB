import { ContactInterface } from './../../../model/contact/contact.interface';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactResponse } from './contact.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class ContactRepository {
  constructor(private http: HttpClient) {}

  getAllContact(): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${environment.URLBase}contact/all`);
  }
}
