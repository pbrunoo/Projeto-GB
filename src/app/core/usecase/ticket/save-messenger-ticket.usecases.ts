import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { GetTicketId, SaveMessageTicketR, SaveMessageTicketS } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class SaveMessageTicketUseCases implements UseCase<SaveMessageTicketS, SaveMessageTicketR>{
    constructor(private getTicketById: TicketRepositorie){}

    execute(param: SaveMessageTicketS): Observable<SaveMessageTicketR> {
        return this.getTicketById.saveMessageTicket(param);
    }
}