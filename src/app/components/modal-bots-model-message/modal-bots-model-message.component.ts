import { CreateModelMessageUseCase } from './../../core/usecase/model-message/create-model-message.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';import { UpdateBotsGreetingUseCase } from 'src/app/core/usecase/bots-greeting/update-bots-greeting.usecase';
import { UpdateModelMessageUseCase } from 'src/app/core/repositories/model-message/update-model-message.usecase';

@Component({
  selector: 'gb-modal-bots-model-message',
  templateUrl: './modal-bots-model-message.component.html',
  styleUrls: ['./modal-bots-model-message.component.scss']
})
export class ModalBotsModelMessageComponent implements OnInit {

  public varSubscriptionModelMessage!: Subscription;
  public event: string = '';
  public backupModalMessage: any;
  public complementObject: any = [];

  public objectModalMessage: any = [];

  public idModalMessage!: string;
  public title: string = 'Novo';
  public titleButton: string = 'Adicionar';

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public botsModelMessageForm: FormGroup = this.fb.group({
    botsName: ["", [Validators.required ]],
    botsMessage: ["", [Validators.required , Validators.maxLength(1024)]]
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private createModelMessageUseCase: CreateModelMessageUseCase,
    private updateModelMessageUseCase: UpdateModelMessageUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(event: string, data?: any) {

    this.botsModelMessageForm.enable();
    this.event = event;

    if(this.event === 'Edit') {
      this.isEditModelMessage(data);
      this.getComplement(data);
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
    }

    if(this.event === 'View') {
      this.isEditModelMessage(data);
      this.getComplement(data);
      this.title = 'Visualizar';
      this.titleButton = 'Editar';
      this.botsModelMessageForm.disable();
    }

    if(this.event === 'Adicionar') {
      this.title = 'Novo';
      this.titleButton = 'Salvar';
    }
		this.modalService.open(this.content, {
      size: 'lg',
      centered: true
    });
	}

  activeModelMessage(event: any) {
    if(event.currentTarget.checked === true) {
      this.botsModelMessageForm.controls['botsTypeModel'].setValue(true);
      return;
    }

    this.botsModelMessageForm.controls['botsTypeModel'].setValue(false);

  }

  saveRegister() {
    this.getInforForm();
    if(this.event === 'View') {
      this.botsModelMessageForm.enable();
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
      this.event = 'Editar';
      return;
    }

    if(this.event === 'Editar') {
      this.updateModalMessageRequest(this.objectModalMessage);
      this.modalService.dismissAll('Close click');
      this.clearAll();
      return;
    }

    this.createModalMessageRequest(this.objectModalMessage);
    this.modalService.dismissAll('Close click');
    this.clearAll();
  }

  isEditModelMessage(modalMessage: any) {
    if(modalMessage) {
      this.idModalMessage = JSON.parse(modalMessage.id);
      this.backupModalMessage = modalMessage;
      this.objectModalMessage = modalMessage;
      this.botsModelMessageForm.patchValue({
        botsName: modalMessage.name,
        botsMessage: modalMessage.message
      });
    }
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearGreeting() {
    if(this.backupModalMessage) {
      this.objectModalMessage = this.backupModalMessage;
      return;
    }
    this.objectModalMessage = []
  }

  clearAll() {
    this.botsModelMessageForm.reset();
    this.objectModalMessage = []
    this.backupModalMessage = []
  }

  errorGreetingResponse = (error: any) => {
    this.showMessage(error, 'error');
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  showMessage(message: string, type: string) {
    let data: any = {
      message: message,
      type: type
    }
    this.toast.showToast(data);
  }

  updateModalMessageRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionModelMessage);
    this.varSubscriptionModelMessage = this.updateModelMessageUseCase.execute(object)
    .subscribe(
      this.successUpdateResponse,
      this.errorResponse
    );
  }

  successUpdateResponse = (res: any) => {
    this.showMessage('Modelo alterado com sucesso!', 'success');
    window.dispatchEvent(new Event('BOT_MODEL_MESSAGE_REFRESH'));
  }

  createModalMessageRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionModelMessage);
    this.varSubscriptionModelMessage = this.createModelMessageUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.showMessage('Modelo adicionado com sucesso!', 'success');
    window.dispatchEvent(new Event('BOT_MODEL_MESSAGE_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde`, 'error');
  }

  mapGreeting(value: any) {
    const valueMapped = value.map((rs: any) => {
      return {
        id: rs.id,
        name: rs.name,
        type: rs.type,
        message: rs.message,
        companyId: rs.companyId,
        selected: false
      }
    });
    return valueMapped;
  }

  getInforForm() {
    if(this.idModalMessage) {
      this.objectModalMessage = {
        id: this.idModalMessage,
        name: this.botsModelMessageForm.controls['botsName'].value,
        type: this.complementObject.type,
        message: this.botsModelMessageForm.controls['botsMessage'].value,
        companyId: this.complementObject.companyId,
        active: this.complementObject.active

      }
      return;
    }

    this.objectModalMessage = {
      name: this.botsModelMessageForm.controls['botsName'].value,
        type: this.complementObject.type,
        message: this.botsModelMessageForm.controls['botsMessage'].value,
        companyId: this.complementObject.companyId,
        active: this.complementObject.active
    }
  }

  getComplement(data: any) {
    this.complementObject = {
      type: data.type,
      companyId: data.companyId,
      active: data.active,
    }
  }
}
