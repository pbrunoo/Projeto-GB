import { Component } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

@Component({
  selector: 'gb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showElments: boolean = false;

  constructor(
    private authGuard: AuthGuard
  ) {

  }

  ngOnInit() {
    this.authGuard.showElementsEmitter
      .subscribe((show) => {
        this.showElments = show;
      });
  }
}
