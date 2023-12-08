import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/user/user.model';

@Injectable({providedIn: 'root' })
export class UserAllRepository {
  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<User> {
    return this.http.get<User>(`${environment.URLBase}user/all`);
  }
}
