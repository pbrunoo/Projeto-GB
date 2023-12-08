import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { getHeader } from "src/app/core/base/headers";
import { AverageTimeModel, Chart2Data, DashBoardTicketModel, TicketUser } from "src/app/core/model/dashboard/dashboard-ticket-data.model";
import { GroupModel } from "src/app/core/model/group/group.model";
import { GroupRepositories } from "src/app/core/repositories/group/group.repositorie";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GroupDataRepository extends GroupRepositories {
    
    getHeaders = {
        headers: getHeader()
    } 
    
    constructor(private http: HttpClient){ super(); }

    getAllGroup(): Observable<GroupModel> {
        return this.http.get<GroupModel>(`${environment.URLBase}group/all`, this.getHeaders);
    }

       
}