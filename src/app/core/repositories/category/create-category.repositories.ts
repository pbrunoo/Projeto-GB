import { CategoryInterface } from './../../model/category/category.model';
import { Observable } from 'rxjs';

export abstract class CreateCategoryRepositories {
  abstract createCategory(params: any): Observable<CategoryInterface>;
}
