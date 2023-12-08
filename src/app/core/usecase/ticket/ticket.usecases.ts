import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { ticketModel } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class SaveTicketUseCases implements UseCase<ticketModel, ticketModel>{
    constructor(private saveTicket: TicketRepositorie){}

    execute(param: ticketModel): Observable<ticketModel> {
        return this.saveTicket.saveTicket(param);
    }
}