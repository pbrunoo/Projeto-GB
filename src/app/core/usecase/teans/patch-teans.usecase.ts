import { TeansInterface } from './../../model/teans/teans.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';import { PatchBotsGreetingRepositories } from '../../repositories/bots-greeting/patch-bots-greeting.repositories';
import { PatchTeansRepositories } from '../../repositories/teans/patch-teans.repositories';

@Injectable({providedIn: 'root'})
export class PatchTeansUseCase implements UseCase <any, TeansInterface> {
  constructor(private patchTeansRepositories: PatchTeansRepositories){}

  execute(params: any): Observable<TeansInterface> {
    return this.patchTeansRepositories.activeOrDesactive(params);
  }
}
