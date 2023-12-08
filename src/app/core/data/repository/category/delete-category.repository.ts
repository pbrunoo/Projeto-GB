import { environment } from 'src/environments/environment';
import { CategoryResponse } from './category.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class DeleteCategoryRepository {
  constructor(private http: HttpClient) {}

  deleteCategory(param: string): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>(`${environment.URLBase}category/${param}`);
  }
}
