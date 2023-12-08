import { CreateModelMessageUseCase } from '../../core/usecase/model-message/create-model-message.usecase';
import { Subscription } from 'rxjs';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';import { UpdateBotsGreetingUseCase } from 'src/app/core/usecase/bots-greeting/update-bots-greeting.usecase';
import { UpdateModelMessageUseCase } from 'src/app/core/repositories/model-message/update-model-message.usecase';
import { CreateCategoryUseCase } from 'src/app/core/usecase/category/create-category.usecase';

@Component({
  selector: 'gb-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss']
})
export class ModalCategoryComponent implements OnInit {

  public varSubscriptionModelMessage!: Subscription;
  public objectCategory: any = [];


  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;
  @ViewChild('content', {static: true}) content!: HTMLElement;

  public categoryForm: FormGroup = this.fb.group({
    name: ["", [Validators.required ]],
  });

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private createCategoryUseCase: CreateCategoryUseCase
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {

  }

  open(event: string, data?: any) {
		this.modalService.open(this.content, {
      size: 'g',
      centered: true
    });
	}


  saveRegister() {
    this.createModalMessageRequest(this.categoryForm.value);
    this.modalService.dismissAll('Close click');
    this.clearAll();
  }

  cancelRegister() {
    this.clearAll();
    this.modalService.dismissAll('Close click');
  }

  clearAll() {
    this.categoryForm.reset();
    this.objectCategory = []
  }

  errorGreetingResponse = (error: any) => {
    this.showMessage(error, 'error');
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

  createModalMessageRequest(object: any) {
    this.unsubscriptionVariable(this.varSubscriptionModelMessage);
    this.varSubscriptionModelMessage = this.createCategoryUseCase.execute(object)
    .subscribe(
      this.successResponse,
      this.errorResponse
    );
  }

  successResponse = (res: any) => {
    this.showMessage('Categoria adicionada com sucesso!', 'success');
    window.dispatchEvent(new Event('CATEGORY_REFRESH'));
  }

  errorResponse = (error: any) => {
    this.showMessage(`Ocorreu um erro tente novamente mais tarde`, 'error');
  }

}
