import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { getHeader } from "src/app/core/base/headers";
import { saveRequesterModel } from "src/app/core/model/requester/requester.model";
import { FilterTicket, FilterTicketReturn, GetTicketId, GetTicketUpdate, ListTicketModel, SaveMessageTicketR, SaveMessageTicketS, ticketModel, UpdateTicketModel } from "src/app/core/model/ticket/ticket.model";
import { TicketRepositorie } from "src/app/core/repositories/ticket/ticket.repositorie";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class SaveTicketDataRepository extends TicketRepositorie {

    getHeaders = {
        headers: getHeader()
    }

    constructor(private http: HttpClient) { super(); }


    saveTicket(param: ticketModel): Observable<ticketModel> {
        return this.http.post<ticketModel>(`${environment.URLBase}ticket`, param, this.getHeaders);
    }

    saveRequesterTicket(param: saveRequesterModel): Observable<saveRequesterModel> {
        return this.http.post<saveRequesterModel>(`${environment.URLBase}ticket-requesters`, param, this.getHeaders);
    }

    listTicket(): Observable<ListTicketModel> {
        return this.http.get<ListTicketModel>(`${environment.URLBase}ticket/ticket-details`, this.getHeaders)
            .pipe(map((rs: any) => {
                let mapper: any = [];
                rs.forEach((e: ListTicketModel) => {
                    mapper.push({
                        id: e.id,
                        subject: e.subject,
                        status: e.status,
                        contacts: e.contacts,
                        user: [e.user],
                        category: e.category,
                        createdAt: e.createdAt,
                        priority: e.priority
                    })
                });
                return mapper;
            }));
    }

    getTicketById(param: number): Observable<GetTicketId> {
        return this.http.get<GetTicketId>(`${environment.URLBase}ticket/byid/${param}`, this.getHeaders);
    }

    updateTicket(param: any): Observable<GetTicketUpdate> {

        let bodyParam = {
            subject: param.subject,
            category: param.category,
            priority: param.priority,
            userId: param.userId,
            status: param.status
        };


        return this.http.put<GetTicketUpdate>(`${environment.URLBase}ticket/${param.ticketId}`, bodyParam, this.getHeaders);
    }

    deleteTicket(param: number): Observable<any> {
        return this.http.delete<any>(`${environment.URLBase}ticket/${param}`, this.getHeaders);
    }

    deleteWithStatusTicket(param: number): Observable<any> {
        return this.http.put<any>(`${environment.URLBase}ticket/delete/${param}`, this.getHeaders);
    }

    saveMessageTicket(param: SaveMessageTicketS): Observable<SaveMessageTicketR> {
        return this.http.post<SaveMessageTicketR>(`${environment.URLBase}ticket-answers`, param, this.getHeaders);
    }

    getSavedMessageTicket(param: number): Observable<SaveMessageTicketR> {
        return this.http.get<SaveMessageTicketR>(`${environment.URLBase}ticket-answers/byid/${param}`, this.getHeaders);
    }

    filterTickets(param: any): Observable<FilterTicketReturn> {
        return this.http.post<FilterTicketReturn>(`${environment.URLBase}ticket/filtered`, param, this.getHeaders)
        .pipe(map((rs: any) => {
            let mapper: any = [];
            rs.forEach((e: ListTicketModel) => {
                mapper.push({
                    id: e.id,
                    subject: e.subject,
                    status: e.status,
                    contacts: e.contacts,
                    user: [e.user],
                    category: e.category,
                    createdAt: e.createdAt,
                    priority: e.priority
                })
            });
            return mapper;
        }));

    }

}
