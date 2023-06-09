import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, map, take, tap, timeout } from 'rxjs';
import { basketActionInit, basketCalculationActionSet } from 'src/app/state/actions/basket.action';
import { AppState } from '../../state/app.state';
import { Product } from '../models/basket';
import { BasketService } from './basket.service';
import { basketSelector } from 'src/app/state/selectors/basket.selector';
import { basketCalculationSelector } from 'src/app/state/selectors/basket.selector';
@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor(
    private http: HttpClient,
    private basketService: BasketService,
    private store: Store<AppState>
  ) {
    // if (environment.useFakeApi) {
    //   this.getFakeBasketById().subscribe();
    // }
  }

  fakeUpdateBasket(product: Product | Product[]) {
    // let temp = this.basketService.iBasketSource.value;

    // let basketItems = this.checkExistence(temp.basketItems, product);
    // let calculation = this.updateCalculation(basketItems);
    // basketActionInit({ basket: basketItems });
    // this.store.dispatch(basketCalculationActionSet({
    //   basketCalculation: calculation
    // }));
  }

  private checkExistence(list: Product[], item: Product | Product[]) {
    if (Array.isArray(item)) {
      for (let node of item) {
        list = this.checkExistence(list, node);
      }
    } else {
      let foundIndex = list.findIndex(x => x.id === item.id);
      if (foundIndex > -1) {
        if (item.count) {
          list[foundIndex] = item;
        } else {
          list.splice(foundIndex, 1);
        }
      } else {
        list.push(item);
      }
    }
    return list;
  }

  private updateCalculation(list: Product[]) {
    let totalCount = 0, totalDiscount = 0, totalPureSum = 0, totalSum = 0;

    list.forEach((item) => {
      totalCount = totalCount + item.count;
      totalDiscount = totalDiscount + item.discount;
      totalPureSum = totalPureSum + item.count * item.price;
      totalSum = totalSum + item.count * (item.price - item.discount);
    });

    return {
      totalCount: totalCount + '',
      totalDiscount: totalDiscount + '',
      totalPureSum: totalPureSum + '',
      totalSum: totalSum + '',
    };
  }

  getFakeGoodById() {
    return this.http.get('./assets/fake-requests/GetGoodById.txt', { responseType: 'text' }).pipe(
      delay(800),
      take(1),
      timeout(13000),
      map(p => JSON.parse(p))
    );
  }

  getFakeGoods() {
    return this.http.get('./assets/fake-requests/GetSomeGoods.txt', { responseType: 'text' }).pipe(
      delay(1200),
      take(1),
      timeout(13000),
      map(p => JSON.parse(p))
    );
  }

  getFakeBrands() {
    return this.http.get('./assets/fake-requests/GetSomeBrands.txt', { responseType: 'text' }).pipe(
      delay(1200),
      take(1),
      timeout(13000),
      map(p => JSON.parse(p))
    );
  }

  getFakeGoodGroups() {
    return this.http.get('./assets/fake-requests/GetSomeGoodGroups.txt', { responseType: 'text' }).pipe(
      delay(1200),
      take(1),
      timeout(13000),
      map(p => JSON.parse(p))
    );
  }

  getFakeBasketById() {
    return this.http.get('./assets/fake-requests/GetBasketById.txt', { responseType: 'text' }).pipe(
      take(1),
      timeout(13000),
      map(p => JSON.parse(p)),
      // tap((value) => this.basketService.basketToStore(value)),
    );
  }
}
