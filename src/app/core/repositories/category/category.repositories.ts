import { CategoryInterface } from './../../model/category/category.model';
import { Observable } from 'rxjs';

export abstract class CategoryRepositories {
  abstract getAll(): Observable<CategoryInterface>;
}
