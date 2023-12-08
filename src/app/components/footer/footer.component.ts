import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public isLogged: boolean = false;
  constructor() { }

  ngOnInit(): void {
    sessionStorage.getItem('ads_help_desk') ? this.isLogged = true : this.isLogged = false;
  }

}
