import { Observable } from 'rxjs';
import { GetRequesterByTicketId, requesterModelR } from '../../model/requester/requester.model';


export abstract class GetRquesterRepositorie{
    abstract getRequesters(): Observable<requesterModelR>;
    abstract getRequestersByTicket(param: number): Observable<GetRequesterByTicketId>;
}