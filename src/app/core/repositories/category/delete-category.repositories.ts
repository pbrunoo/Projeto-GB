import { CategoryResponse } from './../../data/repository/category/category.entity';
import { Observable } from 'rxjs';

export abstract class DeleteCategoryRepositories {
  abstract deleteCategory(params: string): Observable<CategoryResponse>;
}
