import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { ModalDeleteComponent } from './../../components/modal-delete/modal-delete.component';
import { CategoryUseCase } from './../../core/usecase/category/category.usecase';
import { ModalCategoryComponent } from './../../components/modal-category/modal-category.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteCategoryUseCase } from 'src/app/core/usecase/category/delete-category.usecase';

@Component({
  selector: 'gb-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public varSubscriptionCategory!: Subscription;
  public typeModule: string = 'Categoria';
  public objCategory: any = [];
  public categoryData: any = [];
  public showLoad: boolean = true;
  public idDelete!: any;

  @ViewChild(ModalCategoryComponent) showModalCategory!: ModalCategoryComponent;
  @ViewChild(ModalDeleteComponent) showModaldelete!: ModalDeleteComponent;
  @ViewChild(ToastMessageComponent) toast!: ToastMessageComponent;

  constructor(
    private categoryUseCase: CategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase
  ) {
    window.addEventListener('CATEGORY_REFRESH', () => {
      this.requestCategory();
    });
  }

  ngOnInit(): void {
    this.requestCategory();
  }


  unsubscriptionVariable(variable: Subscription) {
    if(variable) {
      variable.unsubscribe();
    }
    return;
  }

  requestCategory() {
    this.showLoad = true;
    this.unsubscriptionVariable(this.varSubscriptionCategory);
    this.varSubscriptionCategory = this.categoryUseCase.execute()
    .subscribe(
      this.successResponse,
      this.errorReesponse
    );
  }

  successResponse = (res: any) => {
    console.log(res)
    this.objCategory = res.sort((a: any ,b: any) => b.id - a.id);
    this.showLoad = false;
  }

  errorReesponse = (error: any) => {
    console.log(error);
    this.showLoad = false;
  }

  showModalDelete(type: string, id: any) {
    this.idDelete = id;
    this.showModaldelete.open(type);
  }

  deleteRegister(value: string) {
    this.deleteRequest();
  }

  deleteRequest() {
    this.unsubscriptionVariable(this.varSubscriptionCategory);
    this.varSubscriptionCategory = this.deleteCategoryUseCase.execute(this.idDelete)
    .subscribe(
      this.successDeleteResponse,
      this.errorDeleteResponse
    );
  }

  successDeleteResponse = (res: any) => {
    this.showMessage('Categoria removida com sucesso!', 'success');
    this.showLoad = false;
    this.requestCategory();
  }

  errorDeleteResponse = (error: any) => {
    this.showLoad = false;
    this.showMessage('Ocorreu um erro, Tente novamente mais tarde', 'error');
  }

  showMessage(message: string, type: string) {
    const data: any = {
      message: message,
      type: type
    }
    this.toast.showToast(data);
  }
}
