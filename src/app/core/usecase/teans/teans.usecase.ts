import { TeansInterface } from '../../model/teans/teans.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";import { Observable } from 'rxjs';
import { TeansRepositories } from '../../repositories/teans/teans.repositories';

@Injectable({providedIn: 'root'})
export class TeansUseCase implements UseCase <any, TeansInterface> {
  constructor(private teansRepositories: TeansRepositories){}

  execute(): Observable<TeansInterface> {
    return this.teansRepositories.getAll();
  }
}
