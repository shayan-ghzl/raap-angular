import { Directive, HostListener, Input } from '@angular/core';
import { PasswordToggleDirective } from './password-toggle.directive';
@Directive({
  selector: '[appPasswordToggleCtrl]'
})
export class PasswordToggleCtrlDirective {
  @Input('appPasswordToggleCtrl') inputElement!: PasswordToggleDirective;
  @HostListener("click")
  toggle() {
    this.inputElement.isShow = !(this.inputElement.isShow);
  }
}