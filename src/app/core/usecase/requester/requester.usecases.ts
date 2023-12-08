import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { requesterModelR } from "../../model/requester/requester.model";
import { GetRquesterRepositorie } from "../../repositories/requester/requester.repositorie";

@Injectable({
    providedIn: 'root'
})

export class GetRequesterUseCases implements UseCase<any, requesterModelR>{
    constructor(private getRequesters: GetRquesterRepositorie){}

    execute(): Observable<requesterModelR> {
        return this.getRequesters.getRequesters();
    }
}