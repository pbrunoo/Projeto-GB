import { CreateNumberWhatsappUseCase } from './../../core/usecase/number-whatsapp/create-number-whatsapp.usecase';
import { TeansUseCase } from './../../core/usecase/teans/teans.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'gb-modal-number-whatsapp',
  templateUrl: './modal-number-whatsapp.component.html',
  styleUrls: ['./modal-number-whatsapp.component.scss']
})
export class ModalNumberWhatsappComponent implements OnInit {

  public varSubscriptionNumberWhatsapp!: Subscription;
  public event: string = '';
  public backupNumberWhatsapp: any;
  public objectTeams: any = [];
  public teams: any = [];
  public requestTeams = [];
  public objectNumberWhatsapp: any = [];
  public disableGroup: boolean = true;
  public isCreate: boolean = false;
  public idNumberWhatsapp!: string;
  public title: string = 'Adicionar';
  public titleButton: string = 'Adicionar';

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public numberMessageForm: FormGroup = this.fb.group({
    groupName: ["", [Validators.required ]]
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private teansUseCase: TeansUseCase,
    private createNumberWhatsappUseCase: CreateNumberWhatsappUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(event: string, data?: any) {
    this.numberMessageForm.disable();
    this.event = event;
    this.requestAllTeams();
    this.isEditNumberWhatsapp(data);

    if(this.objectTeams.length) {
      this.isCreate = false;
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
    }

    if(!this.objectTeams.length) {
      this.isCreate = true;
      this.title = 'Adicionar';
      this.titleButton = 'Salvar';
    }
		this.modalService.open(this.content, {
      size: 'lg',
      centered: true
    });
	}

  deleteTeams(id: number, index: number) {
    this.objectTeams.splice(index, 1);
    this.teams.splice(index, 1);
  }

  getSelectedTeams(event: any): void {
    this.objectTeams.push(event[0]);
    this.objectTeams = this.objectTeams.filter((result: any, i: any)=> this.objectTeams.indexOf(result) === i);
    this.teams = this.objectTeams.map((res: any) => {
      return {'id': res.id}
    });
  }

  saveRegister() {
    this.getInforForm();
    this.createNumberWhastappRequest(this.objectNumberWhatsapp);
    this.modalService.dismissAll('Close click');
    this.clearAll();
    return;
  }

  isEditNumberWhatsapp(data: any) {
    this.idNumberWhatsapp = JSON.parse(data.id);
    this.backupNumberWhatsapp = data;
    this.objectNumberWhatsapp = data;
    this.numberMessageForm.patchValue({
      groupName: data.name,
    });
    this.objectTeams = data.teams;
    this.teams = this.objectTeams.map((res: any) => {
      return {'id': res.id};
    });
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearTeans() {
    if(this.backupNumberWhatsapp) {
      this.objectNumberWhatsapp = this.backupNumberWhatsapp;
      return;
    }
    this.objectNumberWhatsapp = []
  }

  clearAll() {
    this.numberMessageForm.reset();
    this.objectNumberWhatsapp = [];
    this.backupNumberWhatsapp = [];
    this.objectTeams = [];
    this.idNumberWhatsapp = '';
    this.teams = [];
  }

  requestAllTeams() {
    this.unsubscriptionVariable(this.varSubscriptionNumberWhatsapp);
    this.varSubscriptionNumberWhatsapp = this.teansUseCase.execute()
      .subscribe(
        this.successTeamsResponse,
        this.errorTeamsResponse
      )
  }

  successTeamsResponse = (res: any) => {
    this.requestTeams = this.mapTeams(res);
  }

  errorTeamsResponse = (error: any) => {
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

  createNumberWhastappRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionNumberWhatsapp);
    this.varSubscriptionNumberWhatsapp = this.createNumberWhatsappUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.mapMessage();
    window.dispatchEvent(new Event('NUMBER_WHATSAPP_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage('Ocorreu um erro tente novamente mais tarde', 'error');
  }

  mapTeams(value: any) {
    const valueMapped = value.map((rs: any) => {
      return {
        id: rs.id,
        name: rs.name,
        color: rs.color,
        status: rs.status,
        messageWhatsappId: rs.messageWhatsappId,
        selected: false
      }
    });
    return valueMapped;
  }

  getInforForm() {
    this.objectNumberWhatsapp = {
      id: this.idNumberWhatsapp,
      teams: this.teams
    }
  }

  mapMessage() {
    if(this.objectTeams.length === 0) {
      this.showMessage('Equipe adicionada com sucesso!', 'success');
    }

    if(this.objectTeams.length > 0) {
      this.showMessage('Equipe alterada com sucesso!', 'success');
    }
  }
}
