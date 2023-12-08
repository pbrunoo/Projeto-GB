import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root'})

export class QuickAnswersRepository {
  constructor(private http: HttpClient) {}

  getAllQuickAnswers(): Observable<QuickAnswersRepository> {
    return this.http.get<QuickAnswersRepository>(`${environment.URLBase}fastAnswer/all`);
  }
}
