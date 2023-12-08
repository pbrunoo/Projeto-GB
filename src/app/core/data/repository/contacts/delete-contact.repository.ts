import { environment } from 'src/environments/environment';
import { ContactResponse } from './contact.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class DeleteContactRepository {
  constructor(private http: HttpClient) {}

  deleteContact(param: string): Observable<ContactResponse> {
    return this.http.delete<ContactResponse>(`${environment.URLBase}contact/${param}`);
  }
}
