import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[gbChangeDropDownBorderColor]'
})
export class ChangeDropDownBorderColorDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#4285F4');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  constructor(private el: ElementRef) { }

  private highlight(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

}
