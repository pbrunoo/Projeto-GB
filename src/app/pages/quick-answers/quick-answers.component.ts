import { DeleteQuickAnswersUseCase } from './../../core/usecase/quick-answers/delete-quick-answers.usecase';
import { PatchTeansUseCase } from '../../core/usecase/teans/patch-teans.usecase';
import { DeleteTeansUseCase } from '../../core/usecase/teans/delete-teans.usecase';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { BotsGreetingByIdUseCase } from '../../core/usecase/bots-greeting/bots-greeting.usecase-by-id';
import { ToastMessageComponent } from '../../components/toast-message/toast-message.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalmodalQuickAnswersComponent } from 'src/app/components/modal-quick-answers/modal-quick-answers.component';
import { QuickAnswerUseCase } from 'src/app/core/usecase/quick-answers/quick-answers.usecase';
import { TeamQuickAnswerUseCase } from 'src/app/core/usecase/quick-answers/team-quick-answers.usecase';

@Component({
  selector: 'gb-quick-answers',
  templateUrl: './quick-answers.component.html',
  styleUrls: ['./quick-answers.component.scss']
})
export class QuickAnswersComponent implements OnInit {

  public varSubscriptionQuickAnswers!: Subscription;
  public typeModule: string = 'respostas rapidas';
  public objQuickAnswers: any = [];
  public teamsData: any = [];
  public showLoad: boolean = true;
  public teamAll: any = [];
  public idDelete!: any;

  @ViewChild(ModalmodalQuickAnswersComponent) showModalQuickAnswers!: ModalmodalQuickAnswersComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;

  constructor(
    private quickAnswerUseCase: QuickAnswerUseCase,
    private deleteQuickAnswersUseCase: DeleteQuickAnswersUseCase,
    private teamQuickAnswerUseCase: TeamQuickAnswerUseCase,
    private patchTeansUseCase: PatchTeansUseCase
  ) {
    window.addEventListener('QUICK_ANSWERS_REFRESH', () => {
      this.requestQuickAnswers();
    });
  }

  ngOnInit(): void {
    this.requestQuickAnswers();
  }

  editQuickAnswers(event: string, id: number) {
    this.teamsData = this.objQuickAnswers.find((r: any)=> r.id === id);
    this.showModalQuickAnswers.open(event, this.teamsData);
  }

  showModalDelete(type: string, id: any) {
    this.idDelete = id;
    this.showModaldelete.open(type);
  }

  deleteRegister(value: string) {
      this.deleteRequest();
  }

  deleteRequest() {
    this.unsubscriptionVariable(this.varSubscriptionQuickAnswers);
    this.varSubscriptionQuickAnswers = this.deleteQuickAnswersUseCase.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage('Resposta excluída com sucesso!', 'success');
    this.showLoad = false;
    this.requestQuickAnswers();
  }

  errorDeleteResponse = (error: any) => {
    this.showLoad = false;
    this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  async requestQuickAnswers () {
    this.showLoad = true;
    this.quickAnswerUseCase.execute().subscribe(async (res: any) => {
      this.teamAll = res.sort((a: any ,b: any) => b.id - a.id);
      this.objQuickAnswers = await Promise.all(this.teamAll.map(async (res: any)=> {
        const listTeams = await this.requestTeamById(res.id);
        const teams = listTeams;

        setTimeout(()=> { this.showLoad = false;},700);
        return {
          ...res,
         teams: teams
        }
      }));
    },(error) => {
      this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
      setTimeout(()=> { this.showLoad = false;},700);
    });
  }

  requestTeamById(id: any): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.teamQuickAnswerUseCase.execute(id)
      .subscribe((res) => {
        resolve(res);
      },
      (error) => {
        this.showMessage('error', 'error');
      });
    });
  }

  activeTeams(event: any, id: any) {
    let data = {id: id, status: ''};
    if(event.currentTarget.checked === true) {
      this.objQuickAnswers.find((res: any) => {
        if(res.id === id) {
          res.active = true;
          data.status = `{"status": ${res.active}}`;
          this.updateTeamsRequest(data);
        }

      });
      return;
    }
    this.objQuickAnswers.find((res: any) => {
      if(res.id === id) {
        res.active = false;
        data.status = `{"status": ${res.active}}`;
        this.updateTeamsRequest(data);
      }
    });
  }

  updateTeamsRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionQuickAnswers);
    this.varSubscriptionQuickAnswers = this.patchTeansUseCase.execute(object)
    .subscribe(
      this.succesUpdateResponse,
      this.errorUpdateResponse
    );
  }

  succesUpdateResponse = (res: any) => {
    this.showMessage('Equipe alterada com sucesso', 'success');
    this.requestQuickAnswers();
  }

  errorUpdateResponse = (error: any) => {
    this.showMessage('Ocorreu um erro tente novamente mais tarde', 'error');
  }

  showMessage(message: string, type: string) {
    const data: any = {
      message: message,
      type: type
    }
    this.toast.showToast(data);
  }
}
