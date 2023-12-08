import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { ListTicketModel, ticketModel } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class ListTicketUseCases implements UseCase<any, ListTicketModel>{
    constructor(private saveTicket: TicketRepositorie){}

    execute(): Observable<ListTicketModel> {
        return this.saveTicket.listTicket();
    }
}