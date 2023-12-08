import { CreateBotsGreetingUseCase } from './../../core/usecase/bots-greeting/create-bots-greeting.usecase';
import { ModelMessageUseCase } from './../../core/usecase/model-message/model-message.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';import { UpdateBotsGreetingUseCase } from 'src/app/core/usecase/bots-greeting/update-bots-greeting.usecase';

@Component({
  selector: 'gb-modal-bots-greeting',
  templateUrl: './modal-bots-greeting.component.html',
  styleUrls: ['./modal-bots-greeting.component.scss']
})
export class ModalBotsGreetingComponent implements OnInit {

  public varSubscriptionGreeting!: Subscription;
  public event: string = '';
  public backupGreeting: any;
  public dropDownInicialMessage!: number;
  public dropDownFinalMessage!: number;
  public emptyComponent: boolean = false;
  public disableDropdown: boolean = false;

  public objectGreeting: any = [];
  public objectModelMessageInitial =[];
  public objectModelMessageFinal =[];
  public initialMessageTemplateId: any = null;
  public finalMessageTemplateId: any = null;

  public idGreeting!: string;
  public title: string = 'Adicionar';
  public titleButton: string = 'Adicionar';

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public botsGreetingForm: FormGroup = this.fb.group({
    botsName: ["", [Validators.required ]],
    botsTypeModel: [true],
    botsMessageInicial: [""],
    botsMessageFinal: [""],
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private modelMessageUseCase: ModelMessageUseCase,
    private createBotsGreetingUseCase: CreateBotsGreetingUseCase,
    private updateBotsGreetingUseCase: UpdateBotsGreetingUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(event: string, data?: any) {
    this.disableDropdown = false;
    this.botsGreetingForm.enable();
    this.event = event;
    this.requestGreeting();

    if(this.event === 'Edit') {
      this.isEditGreeting(data);
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
    }

    if(this.event === 'View') {
      this.disableDropdown = true;
      this.isEditGreeting(data);
      this.title = 'Visualizar';
      this.titleButton = 'Editar';
      this.botsGreetingForm.disable();
    }

    if(this.event === 'Adicionar') {
      this.title = 'Adicionar';
      this.titleButton = 'Salvar';
    }
		this.modalService.open(this.content, {
      size: 'lg',
      centered: true
    });
	}

  activeModelMessage(event: any) {
    if(event.currentTarget.checked === true) {
      this.botsGreetingForm.controls['botsTypeModel'].setValue(true);
      return;
    }

    this.botsGreetingForm.controls['botsTypeModel'].setValue(false);

  }

  getSelectedGreetingInicial(event: any): void {
    this.initialMessageTemplateId = event[0].id;
  }

  getSelectedGreetingFinal(event: any): void {
    this.finalMessageTemplateId = event[0].id;
  }

  saveRegister() {
    this.getInforForm();

    if(this.event === 'View') {
      this.disableDropdown = false;
      this.botsGreetingForm.enable();
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
      this.event = 'Editar';
      return;
    }

    if(this.event === 'Editar') {
      this.emptyComponent ? this.showMessage('Erro, os campos de mensagens estão vazio', 'error')
      : this.updateGreetingRequest(this.objectGreeting);
      this.emptyComponent = false;
      this.modalService.dismissAll('Close click');
      this.clearAll();
      return;
    }

    this.emptyComponent ? this.showMessage('Erro, os campos de mensagens estão vazio', 'error')
    : this.createGreetingRequest(this.objectGreeting);
    this.emptyComponent = false;
    this.modalService.dismissAll('Close click');
    this.clearAll();
  }

  isEditGreeting(greeting: any) {
    console.log(greeting);
    if(greeting) {
      this.idGreeting = JSON.parse(greeting.id);
      this.backupGreeting = greeting;
      this.objectGreeting = greeting;
      this.initialMessageTemplateId = greeting.initialMessageTemplateId;
      this.finalMessageTemplateId = greeting.finalMessageTemplateId;
      this.botsGreetingForm.patchValue({
        botsName: greeting.title,
        botsMessageInicial: greeting.initialMessage,
        botsMessageFinal: greeting.finalMessage,
        botsTypeModel: greeting.initialMessageTemplateId || greeting.finalMessageTemplateId ? true : false
      });
    }
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearGreeting() {
    if(this.backupGreeting) {
      this.objectGreeting = this.backupGreeting;
      return;
    }
    this.objectGreeting = []
  }

  clearAll() {
    this.botsGreetingForm.reset();
    this.objectGreeting = []
    this.backupGreeting = []
  }

  requestGreeting() {
    this.unsubscriptionVariable(this.varSubscriptionGreeting);
    this.varSubscriptionGreeting = this.modelMessageUseCase.execute()
      .subscribe(
        this.successGreetingResponse,
        this.errorGreetingResponse
      )
  }

  successGreetingResponse = (res: any) => {
    this.objectModelMessageInitial = this.mapGreeting(res);
    this.objectModelMessageFinal = this.mapGreeting(res);
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

  updateGreetingRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionGreeting);
    this.varSubscriptionGreeting = this.updateBotsGreetingUseCase.execute(object)
    .subscribe(
      this.successUpdateResponse,
      this.errorResponse
    );
  }

  successUpdateResponse = (res: any) => {
    this.showMessage('Bot alterado com sucesso!', 'success');
    window.dispatchEvent(new Event('BOT_GREETING_REFRESH'));
  }

  createGreetingRequest(object: any) {
    console.log(object)
    this.unsubscriptionVariable(this.varSubscriptionGreeting);
    this.varSubscriptionGreeting = this.createBotsGreetingUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.showMessage('Bot adicionado com sucesso!', 'success');
    window.dispatchEvent(new Event('BOT_GREETING_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde ${error.statusCode}`, 'error');
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
    if(this.idGreeting) {
      this.objectGreeting = {
        id: this.idGreeting,
        title: this.botsGreetingForm.controls['botsName'].value,
        initialMessage: this.botsGreetingForm.controls['botsMessageInicial'].value,
        finalMessage: this.botsGreetingForm.controls['botsMessageFinal'].value,
        initialMessageTemplateId: this.initialMessageTemplateId,
        finalMessageTemplateId: this.finalMessageTemplateId
      }
      this.justModelMessage(this.objectGreeting);
      return;
    }

    this.objectGreeting = {
      title: this.botsGreetingForm.controls['botsName'].value,
      initialMessage: this.botsGreetingForm.controls['botsMessageInicial'].value,
      finalMessage: this.botsGreetingForm.controls['botsMessageFinal'].value,
      initialMessageTemplateId: this.initialMessageTemplateId,
      finalMessageTemplateId: this.finalMessageTemplateId
    }
    this.justModelMessage(this.objectGreeting);
  }

  justModelMessage(obj: any) {
    if(obj.initialMessage && obj.initialMessageTemplateId) {
      this.objectGreeting.initialMessageTemplateId = null;
      this.objectGreeting.finalMessageTemplateId = null;
      return;
    }

    if(obj.initialMessage && obj.finalMessageTemplateId) {
      this.objectGreeting.initialMessageTemplateId = null;
      this.objectGreeting.finalMessageTemplateId = null;
      return;
    }

    if(obj.finalMessage && obj.initialMessageTemplateId) {
      this.objectGreeting.initialMessageTemplateId = null;
      this.objectGreeting.finalMessageTemplateId = null;
      return;
    }

    if(obj.finalMessage && obj.finalMessageTemplateId) {
      this.objectGreeting.this.initialMessageTemplateId = null;
      this.objectGreeting.this.finalMessageTemplateId = null;
      return;
    }

    if(obj.initialMessage && obj.finalMessage && obj.initialMessageTemplateId && obj.finalMessageTemplateId) {
      this.objectGreeting.initialMessageTemplateId = null;
      this.objectGreeting.finalMessageTemplateId = null;
      return;
    }

    if(!obj.initialMessage && !obj.finalMessage && !obj.initialMessageTemplateId && !obj.finalMessageTemplateId) {
      this.emptyComponent = true;
      return;
    }
  }
}
