import { UserByIdUseCase } from './../../core/usecase/user/user-by-id.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationUseCases } from 'src/app/core/usecase/authentication/authentication.usecase';
import { UpdateUserUseCase } from 'src/app/core/usecase/user/update-user.usecase';

@Component({
  selector: 'gb-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss']
})
export class ModalProfileComponent implements OnInit {

  public varSubscriptionProfile!: Subscription;
  public event: string = '';
  public initialInforUser: any = [];
  public fieldTextTypeOne!: boolean;
  public fieldTextTypeTwo!: boolean;
  public fieldTextTypeThree!: boolean;
  public successAuth: boolean = false;
  public passNoEquals: boolean = false;
  public validatorsNewPassword: boolean = false;
  public showValidateMinCaracterAndContentNumber:boolean = false;
  public objProfile: any = {
    id: 0,
    email: "",
    password: "",
    name: "",
    type: 0,
    companyId: 0,
    groupId: 0,
    active: true,
    }

  public idProfile!: string;

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public profileForm: FormGroup = this.fb.group({
    profileName: ["", [Validators.required ]],
    profileEmail: ["", [Validators.required, Validators.email]],
    profileChecked: [""],
    profilePasswordCurrent: ["", [Validators.required, Validators.minLength(8), Validators.pattern(/[0-9]/) ]],
    profilePasswordNew: ["", [Validators.required, Validators.minLength(8), Validators.pattern(/[0-9]/) ]],
    profilePasswordAgain: ["", [Validators.required, Validators.minLength(8), Validators.pattern(/[0-9]/)]]
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private authenticationUseCases: AuthenticationUseCases,
    private userByIdUseCase: UserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open() {
    this.getInfoUserRequest();


		this.modalService.open(this.content, {
      size: 'lg',
      centered: true
    });
	}

  toggleFieldTextTypeOne() {
    this.fieldTextTypeOne = !this.fieldTextTypeOne;
  }

  toggleFieldTextTypeTwo() {
    this.fieldTextTypeTwo = !this.fieldTextTypeTwo;
  }

  toggleFieldTextTypeThree() {
    this.fieldTextTypeThree = !this.fieldTextTypeThree;
  }


  setFocus() {
    this.showValidateMinCaracterAndContentNumber = true;
  }

  enableTemplateMessageField(evt: any) {
    if (evt) {
      this.validatorsNewPassword = true;

      console.log(this.validatorsNewPassword)
      this.profileForm.controls['profilePasswordCurrent'].enable();
      this.profileForm.controls['profilePasswordNew'].enable();
      this.profileForm.controls['profilePasswordAgain'].enable();
      return;
    }

    if(!evt) {
      this.validatorsNewPassword = false;
      console.log(this.validatorsNewPassword)
      this.profileForm.controls['profilePasswordCurrent'].reset();
      this.profileForm.controls['profilePasswordNew'].reset();
      this.profileForm.controls['profilePasswordAgain'].reset();

      this.profileForm.controls['profilePasswordCurrent'].disable();
      this.profileForm.controls['profilePasswordNew'].disable();
      this.profileForm.controls['profilePasswordAgain'].disable();
    }
  }

  saveRegister() {
    this.getInforForm();
    if(this.validatorsNewPassword) {
      this.authenticationRequest();
      return;
    }
    this.updateUserRequest(this.objProfile);
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }


  clearAll() {
    this.validatorsNewPassword = false;
    this.profileForm.reset();
    this.objProfile = [];
    this.successAuth = false;
    this.passNoEquals = false;
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

  updateUserRequest(object: any) {
    console.log(object);
    this.unsubscriptionVariable(this.varSubscriptionProfile);
    this.varSubscriptionProfile = this.updateUserUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.modalService.dismissAll('Close click');
    this.passNoEquals = false;
    window.dispatchEvent(new Event('USER_REFRESH'));
    this.clearAll();
    this.showMessage('Perfil editado com sucesso!', 'success');
  }

  errorResponse = (error: any) => {
    this.showMessage('Ocorreu um erro tente novamente mais tarde', 'error');
  }

  authenticationRequest() {
    const userAuth: any = {
      email: this.objProfile.email,
      password: this.profileForm.controls['profilePasswordCurrent'].value
    }
    this.unsubscriptionVariable(this.varSubscriptionProfile);
    this.varSubscriptionProfile = this.authenticationUseCases.execute(userAuth)
    .subscribe(
      this.successAuthResponse,
      this.errorAuthResponse
    );
  }

  successAuthResponse = (res: any) => {
    this.successAuth = false;
    this.comparePassWord(
      this.profileForm.controls['profilePasswordNew'].value,
      this.profileForm.controls['profilePasswordAgain'].value
    );
  }

  errorAuthResponse = (error: any) => {
    this.successAuth = true;
  }

  getInforForm() {
    if(this.profileForm.controls['profilePasswordCurrent'].value) {
      this.objProfile = {
        id: this.initialInforUser.id,
        name: this.profileForm.controls['profileName'].value,
        email: this.profileForm.controls['profileEmail'].value,
        password: this.profileForm.controls['profilePasswordNew'].value,
        type: this.initialInforUser.type,
        companyId: this.initialInforUser.companyId,
        groupId: this.initialInforUser.groupId,
        active: true,
      }
      return;
    }

    this.objProfile = {
        id: this.initialInforUser.id,
        name: this.profileForm.controls['profileName'].value,
        email: this.profileForm.controls['profileEmail'].value,
        type: this.initialInforUser.type,
        companyId: this.initialInforUser.companyId,
        groupId: this.initialInforUser.groupId,
        active: true,
    }
  }

  getInforUser() {
    const inforUser = this.initialInforUser;
    this.objProfile = {
      id: inforUser.id,
      email: inforUser.email,
      name: inforUser.name,
      type: inforUser.type,
      companyId: inforUser.companyId,
      groupId: inforUser.groupId,
      active: true,
    }

    this.profileForm.patchValue({
      profileName: inforUser.name,
      profileEmail: inforUser.email,
    });

    this.disableInputsPassword();
  }

  disableInputsPassword() {
    this.profileForm.controls['profilePasswordCurrent'].disable();
    this.profileForm.controls['profilePasswordNew'].disable();
    this.profileForm.controls['profilePasswordAgain'].disable();
  }

  getInfoUserRequest() {
    const getSessionStorage: any = sessionStorage.getItem('info-user');
    let data = JSON.parse(getSessionStorage);
    let infoUser!: any;

    this.userByIdUseCase.execute(data.id)
    .subscribe({
      next:(res: any) => {
        this.initialInforUser = res;
        this.getInforUser();
      },
      error:(e: any) => console.log(e)
    });
  }

  comparePassWord(passOne: any, passTwo: any) {
    if(passOne === passTwo) {
      this.updateUserRequest(this.objProfile);
      this.modalService.dismissAll('Close click');
      return;
    }
    console.log(this.passNoEquals)
    this.passNoEquals = true;
  }
}
