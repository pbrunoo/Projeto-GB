import { PatchTeansUseCase } from './../../core/usecase/teans/patch-teans.usecase';
import { DeleteTeansUseCase } from './../../core/usecase/teans/delete-teans.usecase';
import { ModalDeleteComponent } from './../../components/modal-delete/modal-delete.component';
import { BotsGreetingByIdUseCase } from './../../core/usecase/bots-greeting/bots-greeting.usecase-by-id';
import { ToastMessageComponent } from './../../components/toast-message/toast-message.component';
import { TeansUseCase } from './../../core/usecase/teans/teans.usecase';
import { ModalTeamsComponent } from './../../components/modal-teams/modal-teams.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'gb-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  public varSubscriptionTeams!: Subscription;
  public typeModule: string = 'Equipes';
  public objTeams: any = [];
  public teamsData: any = [];
  public showLoad: boolean = true;
  public teamAll: any = [];
  public idDelete!: any;

  @ViewChild(ModalTeamsComponent) showModalTeams!: ModalTeamsComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;

  constructor(
    private teansUseCase: TeansUseCase,
    private deleteTeansUseCase: DeleteTeansUseCase,
    private botsGreetingByIdUseCase: BotsGreetingByIdUseCase,
    private patchTeansUseCase: PatchTeansUseCase
  ) {
    window.addEventListener('TEAMS_REFRESH', () => {
      this.requestTeams();
    });
  }

  ngOnInit(): void {
    this.requestTeams();
  }

  editTeams(event: string, id: number) {
    this.teamsData = this.objTeams.find((r: any)=> r.id === id);
    this.showModalTeams.open(event, this.teamsData);
  }

  showModalDelete(type: string, id: any) {
    this.idDelete = id;
    this.showModaldelete.open(type);
  }

  deleteRegister(value: string) {
      this.deleteRequest();
  }

  deleteRequest() {
    this.unsubscriptionVariable(this.varSubscriptionTeams);
    this.varSubscriptionTeams = this.deleteTeansUseCase.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage('Equipe removida com sucesso!', 'success');
    this.showLoad = false;
    this.requestTeams();
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

  async requestTeams () {
    this.showLoad = true;
    this.teansUseCase.execute().subscribe(async (res: any) => {
      this.teamAll = res.sort((a: any ,b: any) => b.id - a.id);
      this.objTeams = await Promise.all(this.teamAll.map(async (res: any)=> {
        const listChatbot = await this.requestChatBotById(res.messageWhatsappId);
        const chatbot = listChatbot
        setTimeout(()=> { this.showLoad = false;},700);
        return {
          ...res,
          chatbot: chatbot.title
        }
      }));
    },(error) => {
      this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
      setTimeout(()=> { this.showLoad = false;},700);
    });
  }

  requestChatBotById(id: any): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.botsGreetingByIdUseCase.execute(id)
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
      this.objTeams.find((res: any) => {
        if(res.id === id) {
          res.active = true;
          data.status = `{"status": ${res.active}}`;
          this.updateTeamsRequest(data);
        }

      });
      return;
    }
    this.objTeams.find((res: any) => {
      if(res.id === id) {
        res.active = false;
        data.status = `{"status": ${res.active}}`;
        this.updateTeamsRequest(data);
      }
    });
  }

  updateTeamsRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionTeams);
    this.varSubscriptionTeams = this.patchTeansUseCase.execute(object)
    .subscribe(
      this.succesUpdateResponse,
      this.errorUpdateResponse
    );
  }

  succesUpdateResponse = (res: any) => {
    this.showMessage('Equipe alterada com sucesso', 'success');
    this.requestTeams();
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
