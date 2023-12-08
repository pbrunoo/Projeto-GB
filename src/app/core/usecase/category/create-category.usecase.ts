import { CategoryInterface } from './../../model/category/category.model';
import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { CreateCategoryRepositories } from '../../repositories/category/create-category.repositories';

@Injectable({providedIn: 'root'})
export abstract class CreateCategoryUseCase implements UseCase <any, CategoryInterface> {

  constructor(private createCategoryRepositories: CreateCategoryRepositories) {}

  execute(param: any): Observable<CategoryInterface> {
    return this.createCategoryRepositories.createCategory(param);
  }
}
