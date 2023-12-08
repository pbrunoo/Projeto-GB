import { TeansInterface } from './../../model/teans/teans.interface';
import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { UpdateTeansRepositories } from '../../repositories/teans/update-teans.repositories';

@Injectable({providedIn: 'root'})
export abstract class UpdateTeansUseCase implements UseCase <any, TeansInterface> {

  constructor(private updateTeansRepositories: UpdateTeansRepositories) {}

  execute(param: any): Observable<TeansInterface> {
    return this.updateTeansRepositories.updateTeans(param);
  }
}
