import { environment } from 'src/environments/environment';
import { User } from '../../../model/user/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class UpdateUserRepository {
  constructor(private http: HttpClient) {}

  updateUser(param: any): Observable<User> {
    return this.http.put<User>(`${environment.URLBase}user/${param.id}`, param);
  }
}
