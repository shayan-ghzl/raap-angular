import { Directive, HostListener, Input } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
  selector: '[appDropdownCtrl]'
})
export class DropdownCtrlDirective {

  @Input('appDropdownCtrl') dropdown!: DropdownDirective;

  constructor() { }

  @HostListener("click")
  toggle() {
    this.dropdown.toggle();
  }
}
