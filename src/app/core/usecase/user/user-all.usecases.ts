import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { User } from "../../model/user/user.model";
import { UserAllRepositorie } from "../../repositories/user/user-all.repositorie";

@Injectable({
    providedIn: 'root'
})

export class UserAllUseCases implements UseCase<number, User>{
    constructor(private userAllRepositorie: UserAllRepositorie){}

    execute(): Observable<User> {
        return this.userAllRepositorie.getAllUser();
    }
}
