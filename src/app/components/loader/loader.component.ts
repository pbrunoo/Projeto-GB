import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { WhatsappComponent } from 'src/app/pages/whatsapp/whatsapp.component';

@Component({
  selector: 'gb-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
