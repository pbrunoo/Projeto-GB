import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { QuickAnswersResponse } from './quick-answers.entity';

@Injectable({providedIn:'root'})

export class UpdateQuickAnswersRepository {
  constructor(private http: HttpClient) {}

  updateQuickAnswers(param: any): Observable<QuickAnswersResponse> {

    return this.http.put<QuickAnswersResponse>(`${environment.URLBase}fastAnswer/${param.id}`, param);
  }
}
