import { AuthenticationByTokenUserCase } from './../../core/usecase/authentication/autentication-by-token.usecase';
import { Router } from '@angular/router';
import { AuthenticationUseCases } from './../../core/usecase/authentication/authentication.usecase';
import { ToastMessageComponent } from './../../components/toast-message/toast-message.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gb-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public showComponents: boolean = false;
  public typeToastAlert: string = '';
  public errorAccess: boolean = false;
  public varSubscriptionAuth!: Subscription;

  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  constructor(
    private route: Router,
    private authenticationUseCases: AuthenticationUseCases,
    private authenticationByTokenUserCase: AuthenticationByTokenUserCase
    ) {}

  ngOnInit(): void {}

  showComponentsEvent(event: boolean) {
    this.showComponents = event;
  }

  showToast(event: any) {
    this.toast.showToast(event)
  }

  authAcess(event: any) {
    this.unsubscriptionVariable(this.varSubscriptionAuth);
    this.varSubscriptionAuth = this.authenticationUseCases.execute(event)
    .subscribe(
      this.successAuth,
      this.errorAuth
    );
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  private successAuth = (value: any) => {
    if(this.errorAccess === true) {
      this.errorAccess = false;
    }
    sessionStorage.setItem('ads_help_desk', JSON.stringify(value));
    localStorage.setItem('ads_help_desk', JSON.stringify(value));
    this.descriptToken(value);
  }

  private errorAuth = (error: any) => {
    this.errorAccess = true;
  }

  descriptToken(token: any) {
    this.authenticationByTokenUserCase.execute(token)
      .subscribe({
        next: (res: any) => {
          sessionStorage.setItem('info-user', JSON.stringify(res))
          this.route.navigate(['/dashboard']);
        },
        error: (e) => console.log(e)
      });
  }
}
