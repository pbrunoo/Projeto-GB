import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class tabsMenuDataShare {
  public data: any;

  constructor() {}

  setValue(data: any) {
    this.data = data;
  }

  getValue() {
    return this.data;
  }

  deleteValue() {
    this.data = null;
  }
}
