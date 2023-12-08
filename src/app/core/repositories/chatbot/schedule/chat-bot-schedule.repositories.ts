import { Observable } from 'rxjs';
import { GetAllMessageTemplate, GetAllMessageTemplateR, SaveMessageReturn, SaveMessageSend } from 'src/app/core/model/chatbot/chatbot-schedule.model';

export abstract class ChatBotRepositories {
  abstract getAllMessageTemplate(): Observable<GetAllMessageTemplateR>;
  abstract getAllSchedules(): Observable<GetAllMessageTemplate>;
  abstract saveMessageSchedule(param: SaveMessageSend): Observable<SaveMessageReturn>;
  abstract updateMessageSchedule(param: SaveMessageSend): Observable<SaveMessageReturn>;
  abstract deleteMessageSchedule(param: number): Observable<any>;
  
}
