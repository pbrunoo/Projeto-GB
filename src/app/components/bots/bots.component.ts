import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Console } from 'console';
import { AllChatBotMessagesUseCase } from 'src/app/core/usecase/chatbot/schedule/all-schedule-chatbot-messages.usecases';
import { ChatBotMessagesUseCase } from 'src/app/core/usecase/chatbot/schedule/schedule-chatbot-messages.usecase';
import { DeleteChatBotMessagesTemplateUseCase } from 'src/app/core/usecase/chatbot/schedule/schedule-chatbot-msgschedule-delete.usecase';
import { ModalChatBotScheduleEditViewComponent } from '../modal-chatbot-schedule-editview/modal-chatbot-schedule-editview-component';
import { ModalChatBotScheduleComponent } from '../modal-chatbot-schedule/modal-chatbot-schedule-component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'gb-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss']
})
export class BotsComponent implements OnInit {

  allMessage: any = [];
  loading: boolean = false;

  @Output() amountEmitter = new EventEmitter<any>();

  @ViewChild(ModalChatBotScheduleComponent) ModalChatBotSchedule!: ModalChatBotScheduleComponent;
  @ViewChild(ModalChatBotScheduleEditViewComponent) ModalChatBotScheduleEditViewComponent!: ModalChatBotScheduleEditViewComponent;
  @ViewChild(ModalDeleteComponent) modalDelete!: ModalDeleteComponent;

  constructor(
    private getAllMessage: AllChatBotMessagesUseCase,
    private remove: DeleteChatBotMessagesTemplateUseCase
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.callListMessager();
  }

  openEditModal(i: number, action?: string) {
    let userData = this.allMessage.find((e: any) => e.id === i);
    this.ModalChatBotScheduleEditViewComponent.open('ticket', userData, action);
  }

  callListMessager(){
    this.getAllMessage.execute().subscribe((e: any) => {
      this.loading = false;
      this.allMessage = e;
      this.showAmountMessage(this.allMessage.length);
    })
  }

  callListMessageAgain(){
    this.loading = true;
    this.callListMessager();
  }

  newSchedule(){
    this.ModalChatBotSchedule.open('ticket');
  }

  deleteMessageToModal(i: number, index: number){
    this.modalDelete.open('message-scheduler', [i, index]);
  }

  deleteMessageSchedule(evt: any){
    this.remove.execute(evt[0]).subscribe(r => {
      if(r.status === 200){
       this.allMessage.splice(evt[1], 1)
      }
    })
  }

  resolveStatus(i: number){
    let status: any = {
      1: 'Aguardando',
      2: 'Enviado',
      3: 'Falhou'
    }

    return status[i];
  }

  handlerSaveData(evt: any){
    if(evt){
      this.callListMessageAgain();
    }
  }

  showAmountMessage(total: number) {
    const data = {
      amount: total,
      aba: 'aba-2'
    }
    this.amountEmitter.emit(data);
  }
}
