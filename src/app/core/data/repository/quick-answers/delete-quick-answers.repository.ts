import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { QuickAnswersResponse } from './quick-answers.entity';

@Injectable({providedIn:'root'})

export class DeleteQuickAnswersRepository {
  constructor(private http: HttpClient) {}

  deleteQuickAnswers(param: string): Observable<QuickAnswersResponse> {
    return this.http.delete<QuickAnswersResponse>(`${environment.URLBase}fastAnswer/${param}`);
  }
}
