import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../base/base-usecase";
import { GetTicketId } from "../../model/ticket/ticket.model";
import { TicketRepositorie } from "../../repositories/ticket/ticket.repositorie";

@Injectable({
    providedIn: 'root'
})

export class GetTicketByIdUseCases implements UseCase<number, GetTicketId>{
    constructor(private getTicketById: TicketRepositorie){}

    execute(param: number): Observable<GetTicketId> {
        return this.getTicketById.getTicketById(param);
    }
}