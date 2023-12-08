import { Subscription } from 'rxjs';
import { NumberWhatsappUserCase } from './../../core/usecase/number-whatsapp/number-whatsapp.usecase';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserUseCase } from 'src/app/core/usecase/user/create-user.usecase';
import { UpdateUserUseCase } from 'src/app/core/usecase/user/update-user.usecase';

@Component({
  selector: 'gb-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {

  public event: string = '';
  public backupUser: any;
  public objUser: any = [];
  public objWhatsappNumber: any =[];
  public title: string = 'Adicionar';
  public titleButton: string = 'Adicionar';
  public varSubscriptionNumberWhatsapp!: Subscription;
  public idUser!: number;
  public idNumberWhatsapp!: number;
  public companyId!: any;

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public userForm: FormGroup = this.fb.group({
    userName: ["", [Validators.required ]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.pattern(/[0-9]/), Validators.pattern(/[@#$%ˆ&*().,!]/g)]],
    perfil: ["", [Validators.required]],
    permission: [true],
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private numberWhatsappUserCase: NumberWhatsappUserCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.requestAllNumberWhatsapp();
    this.getCompanyId();
  }

  open(event: string, data?: any) {
    this.isEditUser(data);
    this.event = event;

    if(this.event === 'Editar') {
      this.title = event;
      this.titleButton = 'Salvar alterações';
    }
    if(this.event !== 'Editar') {
      this.title = 'Adicionar';
      this.titleButton = 'Salvar';
    }

		this.modalService.open(this.content, {
      size: 'lg',
      centered: true
    });
	}

  getSelectNumberWhatsappp(event: any): void {
    this.idNumberWhatsapp = event[0].id;
  }

  saveRegister() {
    this.getInforForm();
    if(this.event === 'Editar') {
      this.updateUserRequest(this.objUser);
      this.modalService.dismissAll('Close click');
      this.clearAll();
      return;
    }

    this.createUserRequest(this.objUser);
    this.modalService.dismissAll('Close click');
    this.clearAll();
  }


  isEditUser(user: any) {
    if(user) {
      this.objUser = user;
      this.idUser = user.id;
      this.companyId = JSON.stringify(this.getCompanyId());
      this.idNumberWhatsapp = user.groupId;
      this.userForm.patchValue({
        userName: user.name,
        email: user.email,
        password: user.password,
        perfil: user.type,
        permission: user.active
      });
      this.objUser.companyId = this.getCompanyId();
    }

  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearUser() {
    if(this.backupUser) {
      this.objUser = this.backupUser;
      return;
    }
    this.objUser = []
  }

  clearAll() {
    this.userForm.reset();
    this.objUser = []
    this.backupUser = []
    this.objWhatsappNumber = [];
    this.idNumberWhatsapp = 0;
    this.userForm.reset();
  }

  requestAllNumberWhatsapp() {
    this.unsubscriptionVariable(this.varSubscriptionNumberWhatsapp);
     this.numberWhatsappUserCase.execute()
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.objWhatsappNumber = res;
  }

  errorResponse = (error: any) => {
    this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
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

  activeUser(event: any) {
    if(event.currentTarget.checked === true) {
      this.objUser.active = true;
      this.userForm.controls['permission'].setValue(true);
      return;
    }

    this.objUser.active = false;
    this.userForm.controls['permission'].setValue(false);

  }

  getInforForm() {
    if(this.idUser) {
      this.objUser = {
        id: this.idUser,
        name: this.userForm.controls['userName'].value,
        email: this.userForm.controls['email'].value,
        password: this.userForm.controls['password'].value,
        type: this.userForm.controls['perfil'].value,
        active: this.userForm.controls['permission'].value,
        groupId: this.idNumberWhatsapp,
        companyId: this.getCompanyId()
      }
      return;
    }

    this.objUser = {
      name: this.userForm.controls['userName'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
      type: this.userForm.controls['perfil'].value,
      active: this.userForm.controls['permission'].value,
      groupId: this.idNumberWhatsapp,
      companyId: this.getCompanyId()
    }
  }

  createUserRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionNumberWhatsapp);
    this.varSubscriptionNumberWhatsapp = this.createUserUseCase.execute(object)
    .subscribe(
      this.successCreateResponse,
      this.errorCreateResponse
    );
  }

  successCreateResponse = (res: any) => {
    window.dispatchEvent(new Event('USER_REFRESH'));
    this.showMessage('Usuário adicionado com sucesso!', 'success');
  }

  errorCreateResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde ${error.statusCode}`, 'error');
  }

  updateUserRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionNumberWhatsapp);
    this.varSubscriptionNumberWhatsapp = this.updateUserUseCase.execute(object)
    .subscribe(
      this.successUpdateResponse,
      this.errorUpdateResponse
    );
  }

  successUpdateResponse = (res: any) => {
    window.dispatchEvent(new Event('USER_REFRESH'));
    this.showMessage('Usuário alterado com sucesso!', 'success');
  }

  errorUpdateResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde ${error.statusCode}`, 'error');
  }

  getCompanyId() {
    const getCompanyId: any = (sessionStorage.getItem('info-user'));
    const getCompanyIdJson = JSON.parse(getCompanyId);
    return getCompanyIdJson.companyId;
  }

}
