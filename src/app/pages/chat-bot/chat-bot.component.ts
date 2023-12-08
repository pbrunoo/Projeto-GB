import { ModelMessageUseCase } from './../../core/usecase/model-message/model-message.usecase';
import { BotsGreetingUseCase } from '../../core/usecase/bots-greeting/bots-greeting.usecase';
import { Component, OnInit } from '@angular/core';
import { AllChatBotMessagesUseCase } from 'src/app/core/usecase/chatbot/schedule/all-schedule-chatbot-messages.usecases';

@Component({
  selector: 'gb-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  public abas: number = 2;
  public totalAbasOne = 0;
  public totalAbasTwo = 0;
  public totalAbasThree = 0;
  constructor(
    private botsGreetingUseCase: BotsGreetingUseCase,
    private modelMessageUseCase: ModelMessageUseCase,
    private getAllMessage: AllChatBotMessagesUseCase,
  ) { }

  ngOnInit(): void {
    this.requestAllBotGreeting();
    this.requestAllBotModelMessage();
    this.callListMessager();
  }

  selectAba(numberAba: number) {
    this.abas = numberAba;
  }

  requestAllBotGreeting() {
     this.botsGreetingUseCase.execute()
    .subscribe({
      next: (r: any) => {
        this.requestLength('aba-1', r)
      },
      error: (e) => console.log(e)
    });
  }

  requestAllBotModelMessage() {
    this.modelMessageUseCase.execute()
   .subscribe({
     next: (r: any) => {
       this.requestLength('aba-3', r)
     },
     error: (e) => console.log(e)
   });
 }

  callListMessager(){
    this.getAllMessage.execute().subscribe({
     next: (r: any) => {
       this.requestLength('aba-2', r);
     },
     error: (e) => console.log(e)
   });
  }

  requestLength(aba: any, res: any) {
    const data = {
      amount: res.length,
      aba: aba
    }
    this. getAmount(data);
  }

  getAmount(amount: any) {
    if(amount.aba === 'aba-1') {
      this.totalAbasOne = amount.amount;
    }

    if(amount.aba === 'aba-2') {
      this.totalAbasTwo = amount.amount;
      return;
    }

    if(amount.aba === 'aba-3') {
      this.totalAbasThree = amount.amount;
      return;
    }
  }
}
