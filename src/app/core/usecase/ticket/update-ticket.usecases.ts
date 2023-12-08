import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { GetTicketUpdate, ticketModel, UpdateTicketModel } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class UpdateTicketUseCases implements UseCase<UpdateTicketModel, GetTicketUpdate>{
    constructor(private update: TicketRepositorie){}

    execute(param: UpdateTicketModel): Observable<GetTicketUpdate> {
        return this.update.updateTicket(param);
    }
}