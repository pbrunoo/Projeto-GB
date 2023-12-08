import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { AverageTimeModel } from '../../model/dashboard/dashboard-ticket-data.model';
import { DashBoardRepositories } from '../../repositories/dashboard/dashboard-data.repositorie';

@Injectable({providedIn: 'root'})
export class DashboardDataAverageTimeTicketUseCase implements UseCase<any, AverageTimeModel> {
  
  constructor(private dataTicket: DashBoardRepositories) {}

  execute(): Observable<AverageTimeModel> {
    return this.dataTicket.getAverageTimeTicket();
  }
}
