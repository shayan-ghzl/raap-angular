import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AppState } from './state/app.state';
import { uiActionPlatform } from './state/actions/ui.action';
import { Subscription } from 'rxjs';
import { basketActionStart } from './state/actions/basket.action';
import { identityActionIsLoggedIn, identityActionStart } from './state/actions/identity.action';
import { LoginState } from './state/reducers/identity.reducer';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver,
    private router: Router
    // private swUpdate: SwUpdate
  ) {

  }
  
  @HostListener('window:storage', ['$event'])
  doSomething(e: any) {
    console.log('storage', e);
  }

  routerLoading = false;
  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe({
        next: (response) => {
          // console.log(response, 'router.events');
          if (response instanceof NavigationStart) {
            this.routerLoading = true;
          }
          if (response instanceof NavigationEnd) {
            this.routerLoading = false;
          }
          // Set loading state to false in both of the below events to hide the spinner in case a request fails
          if (response instanceof NavigationCancel) {
            this.routerLoading = false;
          }
          if (response instanceof NavigationError) {
            this.routerLoading = false;
          }
        }
      })
    );

    // this.swUpdate.checkForUpdate().then((response) => {
    //   console.log(response, 'swUpdate checkForUpdate() response');
    // }).catch((error) => {
    //   console.log(error, 'swUpdate checkForUpdate() error');
    // }).finally(() => {
    //   console.log('swUpdate checkForUpdate() finally');
    // });

    // this.swUpdate.versionUpdates.subscribe({
    //   next:(response)=>{
    //     console.log(response, 'swUpdate versionUpdates observable');
    //   },
    //   error:(error)=>{
    //     console.log(error, 'swUpdate versionUpdates observable');
    //   },
    //   complete:()=>{
    //     console.log('swUpdate versionUpdates observable');
    //   },
    // });

    // console.log(this.swUpdate.isEnabled, 'swUpdate isEnabled');

    // this.subscription.add(
    //   this.basketService.getBasketById().subscribe({
    //     next: (response) => {
    //       this.store.dispatch(basketActionInit({ basket: response.basketItems }));
    //     },
    //     error: (error) => {
    //       console.log('error', error);
    //     },
    //     complete: () => {
    //       console.log('there is no basket for this user');
    //     }
    //   })
    // );
    this.store.dispatch(basketActionStart());
    this.store.dispatch(identityActionStart());

    this.subscription.add(
      this.breakpointObserver.observe(['(min-width: 993px) and (min-height: 701px)']).subscribe((state: BreakpointState) => {
        this.store.dispatch(uiActionPlatform({ desktop: state.matches }));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
