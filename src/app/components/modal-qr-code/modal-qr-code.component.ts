import { GetQrCodeUseCase } from './../../core/usecase/whatsapp/get-qr-code.usecase';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'gb-modal-qr-code',
  templateUrl: './modal-qr-code.component.html',
  styleUrls: ['./modal-qr-code.component.scss']
})
export class ModalQrCodeComponent implements OnInit {

  public angularxQrCode: string = '';
  @Input() getIdGroup!: any;
  public valueSize = 390;

  @ViewChild('content', {static: true}) content!: HTMLElement;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private getQrCodeUseCase: GetQrCodeUseCase
  ) {
    this.angularxQrCode = 'Your QR code data string';
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit(): void {
  }

  open(id: any) {
    this.requestQrCode(id);
		this.modalService.open(this.content,{ centered: true });
	}

  closeModal() {
    this.modalService.dismissAll('Close click');
  }

  requestQrCode(id: any) {
    this.getQrCodeUseCase.execute(id)
      .subscribe(
        this.successResponse,
        this.errorResponse
      )
  }

  successResponse = (res: any) => {
    console.log(res);
    //this.objectCompany = this.mapContact(res);
  }

  errorResponse = (error: any) => {
   // this.showMessage(error, 'error');
  }
}
