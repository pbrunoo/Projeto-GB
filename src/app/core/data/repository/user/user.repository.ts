import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable, of } from "rxjs";
import { getHeader } from "src/app/core/base/headers";
import { User } from "src/app/core/model/user/user.model";
import { UserRepositorie } from "src/app/core/repositories/user/user.repositorie";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UserDataRepository extends UserRepositorie {

    getHeaders = {
        headers: getHeader()
    }

    constructor(private http: HttpClient) { super(); }

    getUser(param: number): Observable<User> {
        return this.http.get<User>(`${environment.URLBase}user/byid/${param}`, this.getHeaders);
    }
}
