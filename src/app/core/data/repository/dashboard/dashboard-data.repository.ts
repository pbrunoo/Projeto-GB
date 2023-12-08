import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { getHeader } from "src/app/core/base/headers";
import { AverageTimeModel, Chart2Data, DashBoardTicketModel, TicketUser } from "src/app/core/model/dashboard/dashboard-ticket-data.model";
import { DashBoardRepositories } from "src/app/core/repositories/dashboard/dashboard-data.repositorie";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class DashboardDataRepository extends DashBoardRepositories {
        
    getHeaders = {
        headers: getHeader()
    } 
    
    constructor(private http: HttpClient){ super(); }

    getVolumeTicket(): Observable<DashBoardTicketModel> {
      return this.http.get<DashBoardTicketModel>(`${environment.URLBase}dashboard/ticket-attendace`, this.getHeaders);
    }

    getVolumeTicketTeam(param: number): Observable<DashBoardTicketModel> {
        return this.http.get<DashBoardTicketModel>(`${environment.URLBase}dashboard/ticket-attendace?teamId=${param}`, this.getHeaders);
    }

    getAverageTimeTicket(): Observable<AverageTimeModel> {
        return this.http.get<AverageTimeModel>(`${environment.URLBase}dashboard/ticket-time`, this.getHeaders);
    }

    getDataChart2(param: any): Observable<Chart2Data> {
        return this.http.get<Chart2Data>(`${environment.URLBase}dashboard/ticket-volume?startDate=${param.dataStart}&endDate=${param.dataEnd}`, this.getHeaders);
    }    

    getTicketUser(param?: number | undefined): Observable<TicketUser> {
        let teamId = param ? '?teamId='+param : '';

        return this.http.get<TicketUser>(`${environment.URLBase}dashboard/ticket-user${teamId}`, this.getHeaders);
    }    
}