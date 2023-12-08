import { debounceTime } from 'rxjs/operators';
import { ContactInterface } from '../../../model/contact/contact.interface';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from 'src/app/core/model/user/user.model';

@Injectable({providedIn:'root'})

export class UserByIdRepository {
  constructor(private http: HttpClient) {}

  getUserById(param: string): Observable<User> {
    return this.http.get<User>(`${environment.URLBase}user/byid/${param}`);
  }
}
