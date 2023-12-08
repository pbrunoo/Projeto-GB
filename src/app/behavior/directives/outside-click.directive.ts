import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[gbOutsideClick]'
})
export class OutsideClickDirective {

  @Output() gbOutsideClick = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  
  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.gbOutsideClick.emit({ots: true});
    }
  }

}
