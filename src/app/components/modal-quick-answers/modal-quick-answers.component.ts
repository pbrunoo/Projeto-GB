import { TeansUseCase } from '../../core/usecase/teans/teans.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreateQuickAnwersUseCase } from 'src/app/core/usecase/quick-answers/create-quick-answers.usecase';
import { CreateTeamQuickAnwersUseCase } from 'src/app/core/usecase/quick-answers/create-team-quick-answers.usecase';
import { UpdateQuickAnswersUseCase } from 'src/app/core/usecase/quick-answers/update-quick-answers.usecase';
@Component({
  selector: 'gb-modal-quick-answers',
  templateUrl: './modal-quick-answers.component.html',
  styleUrls: ['./modal-quick-answers.component.scss']
})

export class ModalmodalQuickAnswersComponent implements OnInit {

  public varSubscriptionQuickAnswers!: Subscription;
  public event: string = '';
  public backupQuickAnswers: any;
  public objectTeams: any = [];
  public teams: any = [];
  public requestTeams = [];
  public objectQuickAnswers: any = [];
  public disableDropdown = false;
  public isCreate: boolean = false;
  public idQuickAnswers!: any;
  public title: string = 'Adicionar';
  public titleButton: string = 'Adicionar';

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public quickAnswersForm: FormGroup = this.fb.group({
    shortcuts: ["", [Validators.required, Validators.maxLength(26) ]],
    message: ["", [Validators.required ]]
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private teansUseCase: TeansUseCase,
    private createQuickAnwersUseCase: CreateQuickAnwersUseCase,
    private createTeamQuickAnwersUseCase: CreateTeamQuickAnwersUseCase,
    private updateQuickAnswersUseCase: UpdateQuickAnswersUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(event: string, data?: any) {
    this.event = event;
    this.requestAllTeams();

    if(this.event === 'Edit') {
      this.isEditQuickAnswers(data);
      this.isCreate = false;
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
    }

    if(this.event === 'View') {
      this.disableDropdown = true;
      this.isEditQuickAnswers(data);
      this.title = 'Visualizar';
      this.titleButton = 'Editar';
      this.quickAnswersForm.disable();
    }

    if(this.event === 'Salvar') {
      this.isCreate = true;
      this.title = 'Adicionar';
      this.titleButton = 'Adicionar';
    }
		this.modalService.open(this.content, {
      size: 'l',
      centered: true,
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

    if(this.event === 'View') {
      this.disableDropdown = false;
      this.quickAnswersForm.enable();
      this.title = 'Editar';
      this.titleButton = 'Salvar alterações';
      this.event = 'Edit';
      return;
    }

    if(this.event === 'Edit') {
      this.updateQuickAnswer(this.objectQuickAnswers);
      this.modalService.dismissAll('Close click');
      return;
    }

    this.createQuickRequest(this.objectQuickAnswers);
    this.modalService.dismissAll('Close click');
  }

  isEditQuickAnswers(data: any) {
    this.idQuickAnswers = JSON.parse(data.id);
    this.backupQuickAnswers = data;
    this.objectQuickAnswers = data;
    this.quickAnswersForm.patchValue({
      shortcuts: data.shortCut,
      message: data.message,
    });

    for(let mapObject of data.teams) {
      this.objectTeams.push(mapObject.team);
    }
    this.objectTeams = this.objectTeams.filter((result: any, i: any) => this.objectTeams.indexOf(result) === i);
    this.teams = this.objectTeams.map((res: any) => {
      return {'id': res.id};
    });
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearAll() {
    this.quickAnswersForm.reset();
    this.objectQuickAnswers = [];
    this.backupQuickAnswers = [];
    this.objectTeams = [];
    this.idQuickAnswers = '';
    this.teams = [];
  }

  requestAllTeams() {
    this.unsubscriptionVariable(this.varSubscriptionQuickAnswers);
    this.varSubscriptionQuickAnswers = this.teansUseCase.execute()
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

  createQuickRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionQuickAnswers);
    this.varSubscriptionQuickAnswers = this.createQuickAnwersUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.showMessage('Resposta adicionada com sucesso!', 'success');
    this.createTeamsRequest(res);
    window.dispatchEvent(new Event('QUICK_ANSWERS_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage('Ocorreu um erro tente novamente mais tarde', 'error');
  }

  updateQuickAnswer(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionQuickAnswers);
    this.varSubscriptionQuickAnswers = this.updateQuickAnswersUseCase.execute(object)
    .subscribe(
      this.successUpdateResponse,
      this.errorUpdateResponse
    );
  }

  successUpdateResponse = (res: any) => {
    this.showMessage('Resposta editada com sucesso!', 'success');
    this.createTeamsRequest(res);
    window.dispatchEvent(new Event('QUICK_ANSWERS_REFRESH'));
  }

  errorUpdateResponse = (error: any) => {
    this.showMessage('Ocorreu um erro tente novamente mais tarde', 'error');
  }

  createTeamsRequest(res: any) {
    let data = {
      fastAnswerId: 0,
      teamId: 0
    }
    for(let team of this.teams) {
      data = {
        fastAnswerId: this.idQuickAnswers,
        teamId: team.id
      }

      console.log(data)
      this.createTeamQuickAnwersUseCase.execute(data)
      .subscribe({
        next: (res)=> {},
        error: (e) => {console.log(e)}
      });
    }
    this.clearAll();
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
    if(this.idQuickAnswers) {
      this.objectQuickAnswers = {
        id: this.idQuickAnswers,
        shortCut: this.quickAnswersForm.controls['shortcuts'].value,
        message: this.quickAnswersForm.controls['message'].value
      }
      return;
    }

    this.objectQuickAnswers = {
        shortCut: this.quickAnswersForm.controls['shortcuts'].value,
        message: this.quickAnswersForm.controls['message'].value
    }
  }

}
