import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { GetTicketId, SaveMessageTicketR, SaveMessageTicketS } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class GetMessageTicketUseCases implements UseCase<number, SaveMessageTicketR>{
    constructor(private getTicketById: TicketRepositorie){}

    execute(param: number): Observable<SaveMessageTicketR> {
        return this.getTicketById.getSavedMessageTicket(param);
    }
}