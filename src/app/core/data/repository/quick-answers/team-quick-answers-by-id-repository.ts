import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root'})

export class TeamQuickAnswersByIdRepository {
  constructor(private http: HttpClient) {}

  getTeamQuickAnswersById(param: any): Observable<TeamQuickAnswersByIdRepository> {
    return this.http.get<TeamQuickAnswersByIdRepository>(`${environment.URLBase}fast-answer-team/byid/${param}`);
  }
}
