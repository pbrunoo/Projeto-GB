import { ModalNumberWhatsappComponent } from './../../components/modal-number-whatsapp/modal-number-whatsapp.component';
import { ModalQrCodeComponent } from './../../components/modal-qr-code/modal-qr-code.component';
import { NumberWhatsappUserCase } from './../../core/usecase/number-whatsapp/number-whatsapp.usecase';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'gb-number-whatsapp',
  templateUrl: './number-whatsapp.component.html',
  styleUrls: ['./number-whatsapp.component.scss']
})
export class NumberWhatsappComponent implements OnInit {

  public varSubscriptionAuth!: Subscription;
  public typeModule: string = 'NumberWhatsApp';
  public objNumber: any = [];
  public numberData: any = [];
  public showLoad: boolean = true;

  @ViewChild(ModalQrCodeComponent) showModalQrCode!: ModalQrCodeComponent;
  @ViewChild(ModalNumberWhatsappComponent) showModalNumberWhatsapp!: ModalNumberWhatsappComponent;

  constructor(private numberWhatsappUserCase: NumberWhatsappUserCase) {
    window.addEventListener('NUMBER_WHATSAPP_REFRESH', () => {
      this.requestNumberWhatsapp();
    });
  }

  ngOnInit(): void {
    this.requestNumberWhatsapp();
  }

  addTeans(event: string, id: number) {
    this.numberData = this.objNumber.find((r: any)=> r.id === id);
    this.showModalNumberWhatsapp.open(event, this.numberData);
  }

  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  requestNumberWhatsapp() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionAuth);
    this.varSubscriptionAuth = this.numberWhatsappUserCase.execute()
    .subscribe(
      this.successResponse,
      this.errorReesponse
    );
  }

  successResponse = (res: any) => {
    console.log(res)
    this.objNumber = res.sort((a: any ,b: any) => b.id - a.id);
    this.showLoad = false;
  }

  errorReesponse = (error: any) => {
    console.log(error);
    this.showLoad = false;
  }

  conectDesconect(session: boolean, id: any) {
    if(session) {
      console.log('desconectado');
      return;
    }

    this.showModalQrCode.open(id);
  }
}
