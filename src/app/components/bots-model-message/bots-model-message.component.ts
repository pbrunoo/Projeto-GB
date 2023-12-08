import { ModalBotsModelMessageComponent } from './../modal-bots-model-message/modal-bots-model-message.component';
import { PatchModelMessageUseCase } from './../../core/usecase/model-message/patch-model-message.usecase';
import { DeleteModelMessageUseCase } from './../../core/usecase/model-message/delete-bots-greeting.usecase';
import { ModelMessageUseCase } from './../../core/usecase/model-message/model-message.usecase';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { Subscription } from 'rxjs';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gb-bots-model-message',
  templateUrl: './bots-model-message.component.html',
  styleUrls: ['./bots-model-message.component.scss']
})
export class BotsModelMessageComponent implements OnInit {

  public showLoad: boolean = false;
  public objModelMessage: any = [];
  public idDelete: any;
  public varSubscriptionModelMessage!: Subscription;
  public modelMessageData: any = [];

  @Output() amountEmitterModelMessage = new EventEmitter<any>();

  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;
  @ViewChild(ModalBotsModelMessageComponent) showModalBotsModelMessage!: ModalBotsModelMessageComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  constructor(
    private modelMessageUseCase: ModelMessageUseCase,
    private patchModelMessageUseCase: PatchModelMessageUseCase,
    private deleteModelMessageUseCase: DeleteModelMessageUseCase
  ) {
    window.addEventListener('BOT_MODEL_MESSAGE_REFRESH', () => {
      this.requestAllBotModelMessage();
    });

  }

  ngOnInit(): void {
    this.requestAllBotModelMessage();
  }

  register() {
    this.showModalBotsModelMessage.open('Adicionar');
  }

  showModalDelete(type: string, id: any) {
    this.idDelete = id;
    this.showModaldelete.open(type);
  }

  activeBotModelMessage(event: any, id: any) {
    let data = {id: id, status: ''};

    if(event.currentTarget.checked === true) {
      this.objModelMessage.find((res: any) => {
        if(res.id === id) {
          res.active = true;
          data.status = `{"active": ${res.active}}`;
          console.log(data)
          this.activeOrdeactivateMessage(data);
        }

      });
      return;
    }
    this.objModelMessage.find((res: any) => {
      if(res.id === id) {
        res.active = false;
        data.status = `{"active": ${res.active}}`;
        this.activeOrdeactivateMessage(data);
      }
    });
  }

  activeOrdeactivateMessage(status: any) {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionModelMessage);
     this.patchModelMessageUseCase.execute(status)
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

  editBotModelMessage(event: string, id: any) {
    this.modelMessageData = this.objModelMessage.find((res: any) => res.id === id);
    this.showModalBotsModelMessage.open(event, this.modelMessageData);
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  requestAllBotModelMessage() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionModelMessage);
     this.modelMessageUseCase.execute()
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.showLoad = true;
    this.objModelMessage = res.sort((a: any ,b: any) => b.id - a.id);
    this.showAmountMessage(this.objModelMessage.length);
    console.log(this.objModelMessage.length)
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
      aba: 'aba-3'
    }
    this.amountEmitterModelMessage.emit(data);
  }

  deleteRegister(event: any) {
    this.deleteRequest();
  }

  deleteRequest() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionModelMessage);
    this.varSubscriptionModelMessage = this.deleteModelMessageUseCase.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage('Bot removido com sucesso!', 'success');
    this.showLoad = false;
    this.requestAllBotModelMessage();
  }

  errorDeleteResponse = (error: any) => {
    this.showLoad = false;
    this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
  }
}
