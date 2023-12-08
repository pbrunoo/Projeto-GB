import { DeleteBotsGreetingUseCase } from './../../core/usecase/bots-greeting/delete-bots-greeting.usecase';
import { PatchBotsGreetingUseCase } from './../../core/usecase/bots-greeting/patch-bots-greeting.usecase';
import { ModalBotsGreetingComponent } from './../modal-bots-greetings/modal-bots-greeting.component';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { Subscription } from 'rxjs';
import { BotsGreetingUseCase } from '../../core/usecase/bots-greeting/bots-greeting.usecase';
import { ModalDeleteComponent } from './../modal-delete/modal-delete.component';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import * as Util from 'src/app/shared/util-common';

@Component({
  selector: 'gb-bots-greetings',
  templateUrl: './bots-greetings.component.html',
  styleUrls: ['./bots-greetings.component.scss']
})
export class BotsGreetingsComponent implements OnInit {

  public showLoad: boolean = false;
  public objGreetings: any = [];
  public idDelete: any;
  public varSubscriptionCompany!: Subscription;
  public greetingData: any = [];

  @Output() amountEmitter = new EventEmitter<any>();

  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;
  @ViewChild(ModalBotsGreetingComponent) showModalBotsGreeting!: ModalBotsGreetingComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  constructor(
    private botsGreetingUseCase: BotsGreetingUseCase,
    private patchBotsGreetingUseCase: PatchBotsGreetingUseCase,
    private deleteBotsGreetingUseCase: DeleteBotsGreetingUseCase
  ) {
    window.addEventListener('BOT_GREETING_REFRESH', () => {
      this.requestAllBotGreeting();
    });

  }

  ngOnInit(): void {
    this.requestAllBotGreeting();
  }

  register() {
    this.showModalBotsGreeting.open('Adicionar');
  }

  showModalDelete(type: string, id: any) {
    this.idDelete = id;
    this.showModaldelete.open(type);
  }

  activeBotGreeting(event: any, id: any) {
    let data = {id: id, status: ''};

    if(event.currentTarget.checked === true) {
      this.objGreetings.find((res: any) => {
        if(res.id === id) {
          res.active = true;
          data.status = `{"active": ${res.active}}`;
          console.log(data)
          this.activeOrdeactivateMessage(data);
        }

      });
      return;
    }
    this.objGreetings.find((res: any) => {
      if(res.id === id) {
        res.active = false;
        data.status = `{"active": ${res.active}}`;
        console.log(data)
        this.activeOrdeactivateMessage(data);
      }
    });
  }

  activeOrdeactivateMessage(status: any) {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionCompany);
     this.patchBotsGreetingUseCase.execute(status)
    .subscribe({
      next: (r) => {
        this.showLoad = false;
        this.showMessage('Bot alterado com sucesso', 'success');
      },
      error: (e) => {
        this.showLoad = false;
        this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
      }
    });
  }

  editGreeting(event: string, id: any) {
    this.greetingData = this.objGreetings.find((res: any) => res.id === id);
    this.showModalBotsGreeting.open(event, this.greetingData);
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  requestAllBotGreeting() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionCompany);
     this.botsGreetingUseCase.execute()
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.showLoad = true;
    this.objGreetings = res.sort((a: any ,b: any) => b.id - a.id);
    this.showAmountMessage(this.objGreetings.length);
    this.showLoad = false;
  }

  errorResponse = (error: any) => {
    this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
    this.showLoad = false;
  }

  showMessage(message: string, type: string) {
    const data: any = {
      message: message,
      type: type
    }

    this.toast.showToast(data);
  }

  showAmountMessage(total: number) {
    const data = {
      amount: total,
      aba: 'aba-1'
    }
    this.amountEmitter.emit(data);
  }

  deleteRegister(event: any) {
    this.deleteRequest();
  }

  deleteRequest() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionCompany);
    this.varSubscriptionCompany = this.deleteBotsGreetingUseCase.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage('Bot removido com sucesso!', 'success');
    this.showLoad = false;
    this.requestAllBotGreeting();
  }

  errorDeleteResponse = (error: any) => {
    this.showLoad = false;
    this.showMessage('Erro, o modelo está sendo utilizado', 'error');
  }
}
