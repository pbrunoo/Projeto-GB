import { CategoryInterface } from './../../model/category/category.model';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from '@angular/core';
import { CategoryRepositories } from '../../repositories/category/category.repositories';

@Injectable({providedIn: 'root'})
export class CategoryUseCase implements UseCase<any, CategoryInterface> {
  constructor(private categoryRepositories: CategoryRepositories) {}

  execute(): Observable<CategoryInterface> {
    return this.categoryRepositories.getAll();
  }
}
