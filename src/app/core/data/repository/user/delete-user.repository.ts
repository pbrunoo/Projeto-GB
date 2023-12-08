import { User } from './../../../model/user/user.model';
import { environment } from 'src/environments/environment';import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })

export class DeleteUserRepository {
  constructor(private http: HttpClient) {
  }

  deleteUser(param: any): Observable<User> {
    return this.http.delete<User>(`${environment.URLBase}user/${param}`);
  }
}
