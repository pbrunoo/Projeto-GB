import { environment } from 'src/environments/environment';
import { CategoryResponse } from './category.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class CategoryRepository {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${environment.URLBase}category/all`);
  }
}
