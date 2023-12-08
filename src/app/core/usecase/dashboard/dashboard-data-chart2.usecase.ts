import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { Chart2Data } from '../../model/dashboard/dashboard-ticket-data.model';
import { DashBoardRepositories } from '../../repositories/dashboard/dashboard-data.repositorie';

@Injectable({providedIn: 'root'})
export class DashboardDataChart2UseCase implements UseCase<any, Chart2Data> {
  
  constructor(private dataTicket: DashBoardRepositories) {}

  execute(param: any): Observable<Chart2Data> {
    return this.dataTicket.getDataChart2(param);
  }
}
