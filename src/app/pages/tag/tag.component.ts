import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalGlobalComponent } from 'src/app/components/global-modal/global-modal.component';
import { ModalNumberWhatsappComponent } from 'src/app/components/modal-number-whatsapp/modal-number-whatsapp.component';
import { ModalQrCodeComponent } from 'src/app/components/modal-qr-code/modal-qr-code.component';
import { ModalTagComponent } from 'src/app/components/modal-tag/modal-tag.component';
import { NumberWhatsappUserCase } from 'src/app/core/usecase/number-whatsapp/number-whatsapp.usecase';

@Component({
  selector: 'gb-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @ViewChild(ModalQrCodeComponent) showModalQrCode!: ModalQrCodeComponent;
  @ViewChild(ModalNumberWhatsappComponent) showModalNumberWhatsapp!: ModalNumberWhatsappComponent;

  @ViewChild(ModalTagComponent) modalTagComponent!: ModalTagComponent;
  @ViewChild(ModalGlobalComponent) modalGlobalComponent!: ModalGlobalComponent;
  

  public varSubscriptionAuth!: Subscription;
  public typeModule: string = 'NumberWhatsApp';
  public objNumber: any = [];
  public numberData: any = [];
  public showLoad: boolean = true;

  constructor(private numberWhatsappUserCase: NumberWhatsappUserCase) { }

  ngOnInit(): void {
    this.requestNumberWhatsapp();
  }

  addTag(){
    this.modalTagComponent.open()
  }

  editTag(){
    console.log('edit');
  }

  removeTagModal(i: number){
    this.modalGlobalComponent.open('delete-tag', i);
  }

  deleteTagSelected(evt: any){
    console.log(evt);
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
