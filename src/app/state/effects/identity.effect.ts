import { Injectable } from '@angular/core';
import { catchError, delay, EMPTY, map, mergeMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { IdentityService } from 'src/app/shared/services/identity.service';
import { identityActionIsLoggedIn, identityActionStart } from '../actions/identity.action';
import { LoginState } from '../reducers/identity.reducer';
import Cookies from 'js-cookie';

@Injectable()
export class IdentityEffects {

    startIdentity$ = createEffect(() => {
        return this.action$.pipe(
            ofType(identityActionStart),
            mergeMap(() => this.identityService.getCurrentUser()
                .pipe(
                    delay(3000),
                    map(response => {
                        console.log(response, 'IdentityEffects');
                        if (response.issuccess) {
                            // localStorage.setItem('at', response.data.token);
                            Cookies.set('at', response.data.token, { expires: 10, secure: true });
                            return identityActionIsLoggedIn({ isLoggedIn: LoginState.REGISTERED });
                        }
                        return identityActionIsLoggedIn({ isLoggedIn: LoginState.NOTALLOWED });
                    }),
                    catchError(() => EMPTY)
                    // catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
                )
            )
        );
    });
    constructor(private identityService: IdentityService, private action$: Actions) { }
}
// .catch ((error) => {
//     console.log(error, 'error canActivate');
//     return true;
// });