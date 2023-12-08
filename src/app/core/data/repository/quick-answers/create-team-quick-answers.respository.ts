import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { QuickAnswersResponse } from './quick-answers.entity';

@Injectable({providedIn:'root'})

export class CreateTeamQuickAnswersRepository {
  constructor(private http: HttpClient) {}

  createTeamQuickAnswers(param: any): Observable<QuickAnswersResponse> {
    return this.http.post<QuickAnswersResponse>(`${environment.URLBase}fast-answer-team`, param);
  }
}
