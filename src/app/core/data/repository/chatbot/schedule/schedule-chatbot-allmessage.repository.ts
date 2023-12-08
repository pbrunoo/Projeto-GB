import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { getHeader } from "src/app/core/base/headers";
import { GetAllMessageTemplate, GetAllMessageTemplateR, SaveMessageReturn, SaveMessageSend } from "src/app/core/model/chatbot/chatbot-schedule.model";
import { GetRequesterByTicketId, requesterModelR } from "src/app/core/model/requester/requester.model";
import { ChatBotRepositories } from "src/app/core/repositories/chatbot/schedule/chat-bot-schedule.repositories";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GetMessageDataRepository extends ChatBotRepositories {

    getHeaders = {
        headers: getHeader()
    } 
    
    constructor(private http: HttpClient){ super(); }
    
    getAllSchedules (): Observable<any> {
        return this.http.get<any>(`${environment.URLBase}message-schedule/all`, this.getHeaders)
    }

    getAllMessageTemplate(): Observable<GetAllMessageTemplateR> {
        return this.http.get<any>(`${environment.URLBase}message-template/all`, this.getHeaders)
    }

    saveMessageSchedule(param: SaveMessageSend): Observable<SaveMessageReturn> {
        return this.http.post<SaveMessageReturn>(`${environment.URLBase}message-schedule`, param, this.getHeaders);
    }

    updateMessageSchedule(param: SaveMessageSend): Observable<any> {
        let getId = param.id;
        let obj = param;
        delete obj.id

        return this.http.put<any>(`${environment.URLBase}message-schedule/${getId}`, obj, {...this.getHeaders, observe: 'response'});
    }

    deleteMessageSchedule(param: number): Observable<any> {
        return this.http.delete<any>(`${environment.URLBase}message-schedule/${param}`, {...this.getHeaders, observe: 'response'});
    }  
}