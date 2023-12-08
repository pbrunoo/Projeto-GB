import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'gb-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent implements OnInit {
  public typeToast: string = '';
	public showMessage: string = '';
  public viewToast: boolean = false;


	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(private route: Router){

  }

	ngOnInit(): void {
	}

	public showToast(data: any, sendRoute?: any, seconds: number = 3000): void {
    setTimeout (() => {this.viewToast = true}, 300);
    this.showMessage = data.message;
    this.typeToast = data.type;

    setTimeout (() => {
      this.viewToast = false;
      if(sendRoute) this.route.navigate([sendRoute]);
    }, seconds);
	}

  closeToast() {
    this.viewToast = false;
  }

}
