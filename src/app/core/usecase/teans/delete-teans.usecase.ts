import { TeansInterface } from './../../model/teans/teans.interface';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DeleteTeansRepositories } from '../../repositories/teans/delete-teans.repositories';

@Injectable({providedIn: 'root'})
export class DeleteTeansUseCase implements UseCase <any, TeansInterface> {
  constructor(private deleteTeansRepositories: DeleteTeansRepositories){}

  execute(params: string): Observable<TeansInterface> {
    return this.deleteTeansRepositories.deleteTeans(params);
  }
}
