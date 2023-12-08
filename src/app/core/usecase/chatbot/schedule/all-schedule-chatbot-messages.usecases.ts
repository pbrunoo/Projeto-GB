import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { GetAllMessageTemplate } from 'src/app/core/model/chatbot/chatbot-schedule.model';
import { ChatBotRepositories } from 'src/app/core/repositories/chatbot/schedule/chat-bot-schedule.repositories';

@Injectable({providedIn: 'root'})
export class AllChatBotMessagesUseCase implements UseCase <any, GetAllMessageTemplate> {
  constructor(private getMessage: ChatBotRepositories){}

  execute(): Observable<GetAllMessageTemplate> {
    return this.getMessage.getAllSchedules ();
  }
}
