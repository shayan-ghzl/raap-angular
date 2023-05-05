import { AfterViewInit, Directive, HostBinding, HostListener, Input, QueryList, ViewChildren } from '@angular/core';
import { CollapseContentDirective } from './collapse-content.directive';

@Directive({
  selector: '[collapse]'
})

export class CollapseCtrlDirective {

  content!: CollapseContentDirective;
  constructor() { }

  @Input('collapse')
  public set contentRef(v: CollapseContentDirective) {
    if (v instanceof CollapseContentDirective) {
      this.content = v;
    }
  }

  @HostBinding('class.collapsed')
  get collapsed() {
    return !this.content.open;
  }

  @HostListener('click') onCLick() {
    this.content.toggle();
  }
}