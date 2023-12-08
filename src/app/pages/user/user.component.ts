import { UserSearchUseCase } from './../../core/usecase/user/user-search.usecase';
import { UpdateUserUseCase } from 'src/app/core/usecase/user/update-user.usecase';
import { NumberWhatsappByIdUseCase } from './../../core/usecase/number-whatsapp/number-whatsapp-by-id.usecase';
import { DeleteUserUseCase } from './../../core/usecase/user/delete-user.usecase';
import { UserAllUseCases } from './../../core/usecase/user/user-all.usecases';
import { ToastMessageComponent } from './../../components/toast-message/toast-message.component';
import { Subscription } from 'rxjs';
import { ModalUserComponent } from './../../components/modal-user/modal-user.component';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'gb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  public contactData: any = [];
  public typeModule: string = 'Usuarios';
  public showLoad: boolean = false;
  public varSubscriptionUser!: Subscription;
  public objtUser: any = [];
  public idDelete: any;
  public userAll: any = [];

  @ViewChild(ModalUserComponent) showModalUser!: ModalUserComponent;
  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;

  constructor(
    private userAllUseCases: UserAllUseCases,
    private deleteUserUseCase: DeleteUserUseCase,
    private numberWhatsappByIdUseCase: NumberWhatsappByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private userSearchUseCase: UserSearchUseCase
  ) {
    window.addEventListener('USER_REFRESH', ()=> {
      this.requestUser();
    });
  }

  ngOnInit(): void {
    this.requestUser();
  }

  editUser(event: string, id: any) {
    this.contactData = this.objtUser.find((res: any) => res.id === id);
    this.showModalUser.open(event, this.contactData);
  }

  deleteUserRegister(type: string, id: any) {
    this.idDelete = id;
    this.showModaldelete.open(type);
  }

  activeUser(event: any, id: any) {
    if(event.currentTarget.checked === true) {
      this.objtUser.find((res: any) => {
        if(res.id === id) {
          res.active = true;
          delete res.numberWhatsappName;
          this.updateUserRequest(res);
        }

      });
      return;
    }
    this.objtUser.find((res: any) => {
      if(res.id === id) {
        res.active = false;
        delete res.numberWhatsappName;
        this.updateUserRequest(res);
      }
    });
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  showMessage(message: string, type: string) {
    const data: any = {
      message: message,
      type: type
    }
    this.toast.showToast(data);
  }

  deleteRegister(event: any) {
    this.deleteRequest();
  }

  deleteRequest() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionUser);
    this.varSubscriptionUser = this.deleteUserUseCase.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage('Contato removido com sucesso!', 'success');
    setTimeout(()=> { this.showLoad = false;},700);
    this.requestUser();
  }

  errorDeleteResponse = (error: any) => {
    setTimeout(()=> { this.showLoad = false;},700);
    this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
  }

  async requestUser () {
    this.showLoad = true;
    this.userAllUseCases.execute().subscribe(async (res: any) => {
      this.userAll = res.sort((a: any ,b: any) => b.id - a.id);
      this.objtUser = await Promise.all(this.userAll.map(async (res: any)=> {
        const listNumberwhatsapp = await this.requestNumeroWhatsappById(res.groupId);
        const NumberWhatsapp = listNumberwhatsapp
        setTimeout(()=> { this.showLoad = false;},700);
        return {
          ...res,
          numberWhatsappName: NumberWhatsapp.name
        }
      }));
    },(error) => {
      this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
      setTimeout(()=> { this.showLoad = false;},700);
    });
  }

  async requestSearchUser (param: string) {
    this.showLoad = true;
    this.userSearchUseCase.execute(param).subscribe(async (res: any) => {
      this.userAll = res;
      this.objtUser = await Promise.all(this.userAll.map(async (res: any)=> {
        const listNumberwhatsapp = await this.requestNumeroWhatsappById(res.groupId);
        const NumberWhatsapp = listNumberwhatsapp;
        setTimeout(()=> { this.showLoad = false;},200);
        return {
          ...res,
          numberWhatsappName: NumberWhatsapp.name
        }
      }));
    },(error) => {
      this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
      setTimeout(()=> { this.showLoad = false;},700);
    });
  }

  requestNumeroWhatsappById(id: any): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.numberWhatsappByIdUseCase.execute(id)
      .subscribe((res) => {
        resolve(res);
      },
      (error) => {
        this.showMessage('error', 'error');
      });
    });
  }

  updateUserRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionUser);
    this.varSubscriptionUser = this.updateUserUseCase.execute(object)
    .subscribe(
      this.succesUpdateResponse,
      this.errorUpdateResponse
    );
  }

  succesUpdateResponse = (res: any) => {
    this.requestUser();
  }

  errorUpdateResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde ${error.statusCode}`, 'error');
  }

  reseivedSearch(event: string) {
    this.requestSearchUser(event);
   }
}
