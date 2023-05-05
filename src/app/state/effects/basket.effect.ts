import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, mergeMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { basketActionInit, basketActionStart } from 'src/app/state/actions/basket.action';
import { BasketService } from 'src/app/shared/services/basket.service';

@Injectable()
export class BasketEffects {

    startBasket$ = createEffect(() => {
        return this.action$.pipe(
            ofType(basketActionStart),
            mergeMap(() => this.basketService.getBasketById()
                .pipe(
                    // tap(response => console.log(response, 'BasketEffects startBasket')),
                    map(response =>
                        basketActionInit({ basket: response.basketItems })
                    ),
                    catchError(() => EMPTY)
                    // catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
                )
            )
        );
    });

    constructor(private basketService: BasketService, private action$: Actions) { }

}