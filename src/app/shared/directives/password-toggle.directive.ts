import { Directive } from '@angular/core';
@Directive({
  selector: '[appPasswordToggle]',
  exportAs: 'exportPasswordToggle',
})
export class PasswordToggleDirective {
  isShow = false;
}