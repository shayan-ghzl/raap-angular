import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { PrimaryMenu } from '../../models/ui-model';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { uiSelectorPlatform } from 'src/app/state/selectors/ui.selector';

@Component({
  selector: 'app-primary-menu',
  templateUrl: './primary-menu.component.html',
  styleUrls: ['./primary-menu.component.scss']
})
export class PrimaryMenuComponent implements OnInit, OnDestroy {

  isDesktop = true;
  _blackMovment!: HTMLElement;
  @ViewChild('black_movment') set blackMovment(value: ElementRef) {
    this._blackMovment = value?.nativeElement;
  }

  @Input() menu: PrimaryMenu[] = [];
  @Output('hamburgerPressed') ShowMobileMenu = new EventEmitter<void>();
  theSubscription!: Subscription;

  constructor(private renderer: Renderer2, private store: Store<AppState>) { }


  ngOnInit(): void {
    this.theSubscription = this.store.select(uiSelectorPlatform).subscribe({
      next: (value) => {
        this.isDesktop = value;
      }
    });
  }


  blackMovmentActive(event: any, menuItem: PrimaryMenu) {
    if (this.isDesktop) {
      this.removeLevelOneActive();
      let currentNavItem = event.currentTarget;
      menuItem.isActive = true;
      this.renderer.setStyle(this._blackMovment, "width", `${currentNavItem.offsetWidth}px`);
      this.renderer.setStyle(this._blackMovment, "height", `${currentNavItem.offsetHeight}px`);
      this.renderer.setStyle(this._blackMovment, "top", `${currentNavItem.offsetTop}px`);
      this.renderer.addClass(this._blackMovment, "active");
    }
  }

  blackMovmentDeactive() {
    this.renderer.removeClass(this._blackMovment, "active");
    this.removeLevelOneActive();
  }

  removeLevelOneActive() {
    this.menu.forEach((Element) => {
      Element.isActive = false;
    });
  }
  ngOnDestroy(): void {
    this.theSubscription?.unsubscribe();
  }
}
