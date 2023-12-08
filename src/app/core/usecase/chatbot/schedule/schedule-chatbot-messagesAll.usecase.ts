
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { GetAllMessageTemplate, GetAllMessageTemplateR } from 'src/app/core/model/chatbot/chatbot-schedule.model';
import { ChatBotRepositories } from 'src/app/core/repositories/chatbot/schedule/chat-bot-schedule.repositories';

@Injectable({providedIn: 'root'})
export class ChatBotMessagesTemplateUseCase implements UseCase <any, GetAllMessageTemplateR> {
  constructor(private getMessage: ChatBotRepositories){}

  execute(): Observable<GetAllMessageTemplateR> {
    return this.getMessage.getAllMessageTemplate();
  }
}
