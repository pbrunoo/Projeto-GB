import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { DashBoardTicketModel, TicketUser } from '../../model/dashboard/dashboard-ticket-data.model';
import { DashBoardRepositories } from '../../repositories/dashboard/dashboard-data.repositorie';

@Injectable({providedIn: 'root'})
export class DashboardTicketUserUseCase implements UseCase<number, TicketUser> {
  
  constructor(private dataTicket: DashBoardRepositories) {}

  execute(param?: number): Observable<TicketUser> {
    return this.dataTicket.getTicketUser(param);
  }
}
