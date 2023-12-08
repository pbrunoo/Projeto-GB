import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { GetTicketId } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class DeleteTicketUseCases implements UseCase<number, any>{
    constructor(private getTicketById: TicketRepositorie){}

    execute(param: number): Observable<any> {
        return this.getTicketById.deleteTicket(param);
    }
}