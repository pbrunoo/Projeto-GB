import { Observable } from 'rxjs';
import { AverageTimeModel, Chart2Data, DashBoardTicketModel, TicketUser } from '../../model/dashboard/dashboard-ticket-data.model';

export abstract class DashBoardRepositories {
  abstract getVolumeTicket(): Observable<DashBoardTicketModel>;
  abstract getVolumeTicketTeam(param: number): Observable<DashBoardTicketModel>;
  abstract getAverageTimeTicket(): Observable<AverageTimeModel>;
  abstract getDataChart2(param: any): Observable<Chart2Data>;
  abstract getTicketUser(param?: number): Observable<TicketUser>;
}
