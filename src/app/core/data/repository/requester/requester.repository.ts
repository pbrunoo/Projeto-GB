import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { getHeader } from "src/app/core/base/headers";
import { GetRequesterByTicketId, requesterModelR } from "src/app/core/model/requester/requester.model";
import { GetRquesterRepositorie } from "src/app/core/repositories/requester/requester.repositorie";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class RequesterDataRepository extends GetRquesterRepositorie {    

    getHeaders = {
        headers: getHeader()
    } 
    
    constructor(private http: HttpClient){ super(); }

    getRequesters(): Observable<requesterModelR> {
        return this.http.get<requesterModelR>(`${environment.URLBase}contact/all`, this.getHeaders)
            .pipe(map((rs: any) =>{
                let dataMap: any = [];
                rs.forEach((e:any) => {
                    dataMap.push({
                        id: e.id ,
                        name: e.name,
                        email: e.email,
                        phone: e.phone,
                        companyId: e.companyId
                      })
                });

                return dataMap;
            }));
    }

    getRequestersByTicket(param: number): Observable<GetRequesterByTicketId> {
        return this.http.get<GetRequesterByTicketId>(`${environment.URLBase}ticket-requesters/byid/${param}`, this.getHeaders);
    }

}