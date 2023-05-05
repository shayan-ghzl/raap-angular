import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, lastValueFrom, Observable, skip, take, tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { LoginState } from 'src/app/state/reducers/identity.reducer';
import { identitySelectorIsLoggedIn } from 'src/app/state/selectors/identity.selector';
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  async canActivate(): Promise<boolean> {
    // skip(1), is wrong here:because if it skiped so it will wait until next emit - we should not come here by INITIAL
    return await lastValueFrom(this.store.select(identitySelectorIsLoggedIn).pipe(tap((value) => { console.log(`%c${value}`, 'color:blue;font-weight:bold') }), filter(x => x != LoginState.INITIAL), take(1)))
      .then((response: LoginState) => {
        console.log(response, 'next canActivate');
        if (response == LoginState.REGISTERED) {
          this.router.navigateByUrl('/home');
          return false;
        }
        return true;
      })
      .catch((error) => {
        console.log(error, 'error canActivate');
        return true;
      });

    // return await lastValueFrom(this.identityService.getCurrentUser())
    //   .then((response: { issuccess: boolean, data: { token: string } }) => {
    //     console.log(response, 'next canActivate');
    //     if (response.issuccess) {
    //       localStorage.setItem('ut', response.data.token);
    //       this.router.navigateByUrl('/home');
    //       return false;
    //     }
    //     return true;
    //   })
    //   .catch((error) => {
    //     console.log(error, 'error canActivate');
    //     return true;
    //   });
  }

}
