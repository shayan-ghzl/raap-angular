import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBasket, Product } from '../models/basket';
import { EMPTY, take, tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { basketCalculationActionSet } from 'src/app/state/actions/basket.action';
import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root',
})
export class BasketService {

  _basketId!: string;
  set basketId(value: string) {
    this._basketId = value;
    // localStorage.setItem("bi", this._basketId);
    Cookies.set('bi', this._basketId, { expires: 10, secure: true });
  }
  get basketId() {
    return this._basketId;
  }

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    // this.basketId = localStorage.getItem('bi') || environment.emptyGuid;
    this.basketId = Cookies.get('bi') || environment.emptyGuid;
  }

  getBasketById() {
    if (this.basketId !== environment.emptyGuid) {
      return this.http.get<IBasket>(environment.apiUrl + 'Basket/GetBasketById', { params: new HttpParams().append('id', this.basketId) }).pipe(
        take(1),
        tap(value => {
          this.store.dispatch(basketCalculationActionSet({
            basketCalculation: {
              'totalCount': value.totalCount,
              'totalDiscount': value.totalDiscount,
              'totalPureSum': value.totalPureSum,
              'totalSum': value.totalSum
            }
          }));
        }),
      );
    }
    return EMPTY.pipe(
      // delay(3000)
    );
  }

  updateBasket(product: Product) {
    return this.http.post<IBasket>(environment.apiUrl + 'Basket/UpdateBasket', {
      id: this.basketId,
      basketItem: product
    }).pipe(
      take(1),
      tap(value => {
        this.basketId = value.id || environment.emptyGuid;
        this.store.dispatch(basketCalculationActionSet({
          basketCalculation: {
            'totalCount': value.totalCount,
            'totalDiscount': value.totalDiscount,
            'totalPureSum': value.totalPureSum,
            'totalSum': value.totalSum
          }
        }));
      }),
      //  delay(3000),
    );
  }

  deleteBasket() {
    return this.http.delete<any>(environment.apiUrl + 'Basket/DeleteBasket', { params: new HttpParams().append('id', this.basketId) }).pipe(
      tap(value => {
        this.basketId = environment.emptyGuid;
      }),
      //  delay(3000),
    );
  }

}