import { Directive, OnInit, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { uiSelectorPlatform } from 'src/app/state/selectors/ui.selector';

@Directive({
  selector: '[collapseContent]',
  exportAs: 'collapseContent'
})

export class CollapseContentDirective implements OnInit {

  private isOpen = false;
  isDesktop = true;
  theSubscription!:Subscription;
  constructor(private elementRef: ElementRef, private store: Store<AppState>) { }


  ngOnInit() {
    // this.store.pipe(map((Element: { ui: { isDesktop: boolean } }) => Element.ui.isDesktop)).subscribe((state: boolean) => {
    //   this.isDesktop = state;
    //   if (!this.isDesktop) {
    //     this.elementRef.nativeElement.classList.add('collapse');
    //   }
    // });
    this.theSubscription = this.store.select(uiSelectorPlatform).subscribe({
      next: (value) => {
        this.isDesktop = value;
        if (!this.isDesktop) {
          this.elementRef.nativeElement.classList.add('collapse');
        }
      }
    });
  }

  @HostListener('transitionend')
  onTransitionComplete() {
    const element: HTMLElement = this.elementRef.nativeElement;
    element.classList.remove('collapsing');
    element.classList.add('collapse');
    if (this.isOpen) {
      element.style.height = '';
      element.classList.add('show');
    }
  }

  hide() {
    this.isOpen = false;
    const element: HTMLElement = this.elementRef.nativeElement;
    element.classList.remove('collapse');
    element.classList.remove('show');
    element.style.height = `${element.offsetHeight}px`;
    element.offsetHeight;
    element.classList.add('collapsing');
    element.style.height = '';
  }

  show() {
    this.isOpen = true;
    const element: HTMLElement = this.elementRef.nativeElement;
    element.classList.remove('collapse');
    element.classList.add('collapsing');
    element.style.height = `${element.scrollHeight}px`;
  }

  toggle() {
    if (!this.isDesktop) {
      this.open ? this.hide() : this.show();
    }
  }

  get open() {
    return this.isOpen || this.elementRef.nativeElement.classList.contains('show');
  }
  ngOnDestroy(): void {
    this.theSubscription?.unsubscribe();
  }
}
