import { TeansInterface } from './../../model/teans/teans.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CreateTeansRepositories } from '../../repositories/teans/create-teans.repositories';

@Injectable({providedIn: 'root'})
export class CreateTeansUseCase implements UseCase <any, TeansInterface> {
  constructor(private createTeansRepositories: CreateTeansRepositories){}

  execute(params: string): Observable<TeansInterface> {
    return this.createTeansRepositories.createTeans(params);
  }
}
