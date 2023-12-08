import { Observable } from 'rxjs';
import { saveRequesterModel } from '../../model/requester/requester.model';
import { FilterTicket, FilterTicketReturn, GetTicketId, GetTicketUpdate, ListTicketModel, SaveMessageTicketR, SaveMessageTicketS, ticketModel, UpdateTicketModel } from '../../model/ticket/ticket.model';


export abstract class TicketRepositorie{
    abstract saveTicket(param: ticketModel): Observable<ticketModel>;
    abstract saveRequesterTicket(param: saveRequesterModel): Observable<saveRequesterModel>;
    abstract listTicket(): Observable<ListTicketModel>;
    abstract getTicketById(param: number): Observable<GetTicketId>;
    abstract updateTicket(param: UpdateTicketModel): Observable<GetTicketUpdate>;
    abstract deleteTicket(param: number): Observable<any>;
    abstract deleteWithStatusTicket(param: number): Observable<any>;
    abstract saveMessageTicket(param: SaveMessageTicketS): Observable<SaveMessageTicketR>;
    abstract getSavedMessageTicket(param: number): Observable<SaveMessageTicketR>;
    abstract filterTickets(param: any): Observable<FilterTicketReturn>;
}
