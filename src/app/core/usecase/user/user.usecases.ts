import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { User } from "../../model/user/user.model";
import { UserRepositorie } from "../../repositories/user/user.repositorie";

@Injectable({
    providedIn: 'root'
})

export class GetUserUseCases implements UseCase<number, User>{
    constructor(private userById: UserRepositorie){}

    execute(param: number): Observable<User> {
        return this.userById.getUser(param);
    }
}
