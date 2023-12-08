import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { DashBoardTicketModel } from '../../model/dashboard/dashboard-ticket-data.model';
import { DashBoardRepositories } from '../../repositories/dashboard/dashboard-data.repositorie';

@Injectable({providedIn: 'root'})

export class DashboardDataTicketTeamUseCase implements UseCase<number, DashBoardTicketModel> {
  
  constructor(private dataTicket: DashBoardRepositories) {}

  execute(param: number): Observable<DashBoardTicketModel> {
    return this.dataTicket.getVolumeTicketTeam(param);
  }
}
