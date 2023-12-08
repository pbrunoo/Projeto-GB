import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'gb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public  fieldTextType!: boolean;
  public loginRemeberLocalStorage: any = [];
  public showValidateMinCaracterAndContentNumber:boolean = false;
  public showValidateMinCaracter:boolean = false;
  public showValidateContentNumber: boolean = false;
  public requestErrorResult: boolean = false;

  @Input() errorAuth!: any;
  @Output() showRememberPassword: EventEmitter<boolean> = new EventEmitter();
  @Output() inforLogin: EventEmitter<any> = new EventEmitter();

  public registrationForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.pattern(/[0-9]/), /*Validators.pattern(/[@#$%ˆ&*().,!]/g)*/]],
  });


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private domSanitizer: DomSanitizer,

  ) {
    if(localStorage.getItem('ads_help_desk')) {
      this.route.navigate(['/home']);
      return;
    }
  }

  ngOnInit(): void {
    this.getLocalStorageRemember();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  remember() {
    const checkBox = this.isChecked();

    if(checkBox.checked) {
      this.loginRemeberLocalStorage = this.registrationForm.value;
    }

    if(!checkBox.checked) {
      this.loginRemeberLocalStorage = [];
    }
  }

  setLocalStorageRemember() {
    if(this.loginRemeberLocalStorage.email !== undefined || this.loginRemeberLocalStorage.password !== undefined) {
      localStorage.setItem('login', JSON.stringify(this.registrationForm.value));
      return;
    }
  }

  getLocalStorageRemember() {
    const getLogin: any = localStorage.getItem('login');
    let checkBox = this.isChecked();

    if(getLogin) {
      const dataLoginStorage = JSON.parse(getLogin);
      this.registrationForm.controls['email'].setValue(dataLoginStorage.email);
      this.registrationForm.controls['password'].setValue(dataLoginStorage.password);
      checkBox.checked = true;
      return;
    }

    if(!getLogin) {
      checkBox.checked = false;
    }
  }

  isChecked() {
    return document.getElementById('check') as HTMLInputElement;
  }

  setFocus() {
    this.showValidateMinCaracterAndContentNumber = true;
  }

  authenticate() {
    const access = this.registrationForm.value;
    this.setLocalStorageRemember();
    this.inforLogin.emit(access);
  }

  goRemember() {
    this.showRememberPassword.emit(true);
  }
}
