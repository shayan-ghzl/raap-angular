import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'exportDropdown',
  host: {
    //   '(document:click)': 'onClick($event)',
    '[class.show]': 'isShow',
  },
})
export class DropdownDirective implements OnInit {

  private target!: HTMLElement;
  private isShow = false;

  constructor(private elementRef: ElementRef) { }
  // onClick(event: MouseEvent) {
  // }
  // @HostListener("click")
  // clicked() {
  // }
  // @HostListener('document:click', ['$event', '$event.target'])
  // clickedOut(event: MouseEvent, targetElement: HTMLElement) {
  // }

  ngOnInit() {
    this.target = this.elementRef.nativeElement;
  }

  open() {
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }

  toggle() {
    this.isShow = !this.isShow;
  }

  get isOpen() {
    return this.isShow;
  }

  @HostListener('document:click', ['$event.target'])
  detectClickOutside(target: HTMLElement) {
    if (!this.target.contains(target)) {
      this.isShow = false;
    }
  }
}
