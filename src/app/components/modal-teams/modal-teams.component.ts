import { CreateTeansUseCase } from './../../core/usecase/teans/create-teans.usecase';
import { BotsGreetingUseCase } from './../../core/usecase/bots-greeting/bots-greeting.usecase';
import { UpdateTeansUseCase } from 'src/app/core/usecase/teans/update-teans.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';import { UpdateBotsGreetingUseCase } from 'src/app/core/usecase/bots-greeting/update-bots-greeting.usecase';

@Component({
  selector: 'gb-modal-teams',
  templateUrl: './modal-teams.component.html',
  styleUrls: ['./modal-teams.component.scss']
})
export class ModalTeamsComponent implements OnInit {

  public varSubscriptionTeams!: Subscription;
  public event: string = '';
  public backupTeams: any;
  public objectTeams: any = [];
  public objectMessageWhatsapp: any = [];
  public idTeams!: string;
  public getMessageWhatsappId!: number;
  public setMessageWhatsappId!: number;
  public title: string = 'Adicionar';
  public titleButton: string = 'Adicionar';
  public color: string = '';

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public teamsForm: FormGroup = this.fb.group({
    teamName: ["", [Validators.required ]]
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private botsGreetingUseCase: BotsGreetingUseCase,
    private createTeansUseCase: CreateTeansUseCase,
    private updateTeansUseCase: UpdateTeansUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(event: string, data?: any) {
    this.event = event;
    this.requestMessageWhatsapp();

    if(this.event === 'Edit') {
      this.isEditTeams(data);
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
    }

    if(this.event === 'Adicionar') {
      this.title = 'Adicionar';
      this.titleButton = 'Salvar';
    }
		this.modalService.open(this.content, {
      size: 'l',
      centered: true
    });
	}

  getColor(color: string) {
    this.color = color;
  }

  getSelectedMessageWhatsappId(event: any): void {
    this.getMessageWhatsappId = event[0].id;
  }

  saveRegister() {
    this.getInforForm();

    if(this.event === 'Edit') {
      this.updateGreetingRequest(this.objectTeams);
      this.modalService.dismissAll('Close click');
      this.clearAll();
      return;
    }

    this.createTeamsRequest(this.objectTeams);
    this.modalService.dismissAll('Close click');
    this.clearAll();
  }

  isEditTeams(teams: any) {
    if(teams) {
      this.idTeams = JSON.parse(teams.id);
      this.backupTeams = teams;
      this.objectTeams = teams;
      this.teamsForm.patchValue({
        teamName:teams.name
      });
      this.objectTeams.color = teams .color;
      this.setMessageWhatsappId = teams.messageWhatsappId;
      this.getMessageWhatsappId = teams.messageWhatsappId;
    }
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearTeams() {
    if(this.backupTeams) {
      this.objectTeams = this.backupTeams;
      return;
    }
    this.objectTeams = []
  }

  clearAll() {
    this.teamsForm.reset();
    this.objectTeams = []
    this.backupTeams = []
  }

  requestMessageWhatsapp() {
    this.unsubscriptionVariable(this.varSubscriptionTeams);
    this.varSubscriptionTeams = this.botsGreetingUseCase.execute()
      .subscribe(
        this.successMessageWhatsappResponse,
        this.errorMessageWhatsappResponse
      )
  }

  successMessageWhatsappResponse = (res: any) => {
    this.objectMessageWhatsapp = this.mapMessageWhatsapp(res);
  }

  errorMessageWhatsappResponse = (error: any) => {
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
    this.unsubscriptionVariable(this.varSubscriptionTeams);
    this.varSubscriptionTeams = this.updateTeansUseCase.execute(object)
    .subscribe(
      this.successUpdateResponse,
      this.errorResponse
    );
  }

  successUpdateResponse = (res: any) => {
    this.showMessage('Equipe alterado com sucesso!', 'success');
    window.dispatchEvent(new Event('TEAMS_REFRESH'));
  }

  createTeamsRequest(object: any) {
    console.log(object)
    this.unsubscriptionVariable(this.varSubscriptionTeams);
    this.varSubscriptionTeams = this.createTeansUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.showMessage('Bot adicionado com sucesso!', 'success');
    window.dispatchEvent(new Event('TEAMS_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde ${error.statusCode}`, 'error');
  }

  mapMessageWhatsapp(value: any) {
    const valueMapped = value.map((rs: any) => {
      return {
        id: rs.id,
        name: rs.title,
        type: rs.inicialMessage,
        message: rs.finalMessage,
        companyId: rs.initialMessageTemplateId,
        selected: false
      }
    });
    return valueMapped;
  }

  getInforForm() {
    if(this.idTeams) {
      this.objectTeams = {
        id: this.idTeams,
        name: this.teamsForm.controls['teamName'].value,
        color: this.color,
        messageWhatsappId: this.getMessageWhatsappId

      }
      console.log(this.objectTeams)
      return;
    }

    this.objectTeams = {
      name: this.teamsForm.controls['teamName'].value,
      color: this.color,
      messageWhatsappId: this.getMessageWhatsappId
    }
  }
}
