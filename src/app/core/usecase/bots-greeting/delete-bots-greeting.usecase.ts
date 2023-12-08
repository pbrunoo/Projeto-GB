import { botsGreentingResponse } from './../../data/repository/bots-greeting/bots-greeting.entity';
import { botsGreentingInterface } from './../../model/bots-greeting/bots-greeting.interface';
import { CompanyInterface } from '../../model/company/company.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DeleteBotsGreetingRepositories } from '../../repositories/bots-greeting/delete-bots-greeting.repositories';

@Injectable({providedIn: 'root'})
export class DeleteBotsGreetingUseCase implements UseCase <any, botsGreentingResponse> {
  constructor(private deleteBotsGreetingRepositories: DeleteBotsGreetingRepositories){}

  execute(params: string): Observable<botsGreentingResponse> {
    return this.deleteBotsGreetingRepositories.deleteBotGreeting(params);
  }
}
