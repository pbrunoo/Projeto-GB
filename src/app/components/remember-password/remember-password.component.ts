import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'gb-remember-password',
  templateUrl: './remember-password.component.html',
  styleUrls: ['./remember-password.component.scss']
})
export class RememberPasswordComponent implements OnInit {
  public  fieldTextType!: boolean;
  public loginRemeberLocalStorage: any = [];
  public showValidateMinCaracterAndContentNumber:boolean = false;
  public showValidateMinCaracter:boolean = false;
  public showValidateContentNumber: boolean = false;
  public requestErrorResult: boolean = false;

  @Output() showRememberPassword: EventEmitter<boolean> = new EventEmitter();
  @Output() emitToastMessage: EventEmitter<boolean> = new EventEmitter();

  public registrationForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]]
  });


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private domSanitizer: DomSanitizer,

  ) {
    if(sessionStorage.getItem('ads_help_desk')) {
      this.route.navigate(['/home']);
      return;
    }
  }

  ngOnInit(): void {
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  sendEmail() {
    const data: any = {
      message: 'E-mail enviado com sucesso',
      type: 'success'
    }
    this.emitToastMessage.emit(data);
    this.showRememberPassword.emit(false);
  }

  private successRequest = (value: any) => {
    this.requestErrorResult = false;
    console.log(value);
  }

  private errorRequest = (error: any) => {
    this.requestErrorResult = true;
    console.log(error);
  }

  goLogin() {
    this.showRememberPassword.emit(false);
  }
}
