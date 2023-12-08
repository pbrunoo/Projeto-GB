import { CategoryResponse } from './../../data/repository/category/category.entity';
import { Injectable } from '@angular/core';
import { UseCase } from 'src/app/core/base/base-usecase';
import { Observable } from 'rxjs';
import { DeleteCategoryRepositories } from '../../repositories/category/delete-category.repositories';

@Injectable({providedIn: 'root'})
export abstract class DeleteCategoryUseCase implements UseCase <any, CategoryResponse> {

  constructor(private deleteCategoryRepositories: DeleteCategoryRepositories) {}

  execute(param: string): Observable<CategoryResponse> {
    return this.deleteCategoryRepositories.deleteCategory(param);
  }
}
