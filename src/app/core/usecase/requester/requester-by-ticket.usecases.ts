import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { GetRequesterByTicketId } from "../../model/requester/requester.model";
import { GetRquesterRepositorie } from "../../repositories/requester/requester.repositorie";

@Injectable({
    providedIn: 'root'
})

export class GetRequesterByTicketUseCases implements UseCase<any, GetRequesterByTicketId>{
    constructor(private getRequesters: GetRquesterRepositorie){}

    execute(param: number): Observable<GetRequesterByTicketId> {
        return this.getRequesters.getRequestersByTicket(param)
    }
}