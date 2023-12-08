
import { UseCase } from 'src/app/core/base/base-usecase';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { GetAllMessageTemplate, GetAllMessageTemplateR, SaveMessageReturn, SaveMessageSend } from 'src/app/core/model/chatbot/chatbot-schedule.model';
import { ChatBotRepositories } from 'src/app/core/repositories/chatbot/schedule/chat-bot-schedule.repositories';

@Injectable({providedIn: 'root'})
export class SaveChatBotMessagesTemplateUseCase implements UseCase <SaveMessageSend, SaveMessageReturn> {
  constructor(private postMessage: ChatBotRepositories){}

  execute(param: SaveMessageSend): Observable<SaveMessageReturn> {
    return this.postMessage.saveMessageSchedule(param);
  }
}
