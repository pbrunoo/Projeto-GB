import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { saveRequesterModel } from "../../model/requester/requester.model";
import { ticketModel } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class SaveRequesterTicketUseCases implements UseCase<saveRequesterModel, saveRequesterModel>{
    constructor(private saveRequester: TicketRepositorie){}

    execute(param: saveRequesterModel): Observable<saveRequesterModel> {
        return this.saveRequester.saveRequesterTicket(param);
    }
}