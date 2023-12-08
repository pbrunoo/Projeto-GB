import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { FilterTicket, FilterTicketReturn, ListTicketModel } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class FilterTicketUseCases implements UseCase<any, FilterTicketReturn>{
    constructor(private saveTicket: TicketRepositorie){}

    execute(param: any): Observable<FilterTicketReturn> {
        return this.saveTicket.filterTickets(param);
    }
}