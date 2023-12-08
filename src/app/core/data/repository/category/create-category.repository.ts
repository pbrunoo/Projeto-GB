import { environment } from 'src/environments/environment';
import { CategoryResponse } from './category.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class CreateCategoryRepository {
  constructor(private http: HttpClient) {}

  createCategory(param: any): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${environment.URLBase}category`, param);
  }
}
