import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { basketActionAdd, basketActionRemove } from 'src/app/state/actions/basket.action';
import { AppState } from 'src/app/state/app.state';
import { Good, Product } from '../../models/basket';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product!: Good;
  @Input() productCount = 0;

  // @Input() get basketList() {
  //   return this._basket;
  // }
  // set basketList(value: Product[]) {
  //   let temp = value.filter(p => p.id == this.product.id);
  //   if (temp) {
  //     this._basket = temp;
  //   }
  // }

  // _product!: Product;
  // @Input() get product(): Product {
  //   return this._product;
  // }
  // set product(val: Product) {
  //   // this._product = { ...val, count: val.count };
  //   this._product = val;
  // }
  subscription = new Subscription();
  constructor(private store: Store<AppState>, private basketService: BasketService) {
    console.log('PRODUCTCARD constructor---');
  }

  ngOnInit(): void {
  }

  basketUpdateSubscription!: Subscription;
  addToBasket(count: number) {
    this.basketUpdateSubscription?.unsubscribe();
    // question: why we are doing this instead of sending this.product ?
    // answer: in basket we do not have Good model, it is Product model so we are conver Good to Product below 

    let temp = {
      id: this.product.id,
      goodName: (this.product.goodParent?.name || '') + ' ' + (this.product.brand?.name || ''),
      goodPageUrl: this.product.pageUrl,
      brandName: this.product.brand?.name || '',
      price: this.product.userGroupPrice!.price,
      discount: this.product.userGroupPrice!.discount,
      finalPrice: this.calculatePriceAfterDiscount(this.product.userGroupPrice!.price, this.product.userGroupPrice!.discount, 1),
      count: count,
      imageUrl: (this.product.goodImages.length) ? this.product.goodImages[0].imageUrl : '',
      goodType: 0,
    };

    // this.subscription.add(
    //   this.basketService.updateBasket(temp).subscribe({
    //     next: (response) => {
    //       if (count == 0) {
    //         this.store.dispatch(basketActionRemove({ productId: temp.id }));
    //       } else {
    //         this.store.dispatch(basketActionAdd({ product: temp }));
    //       }
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }
    //   })
    // );

    this.basketUpdateSubscription = this.basketService.updateBasket(temp).subscribe({
      next: (response) => {
        if (count == 0) {
          this.store.dispatch(basketActionRemove({ productId: temp.id }));
        } else {
          this.store.dispatch(basketActionAdd({ product: temp }));
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  calculatePriceAfterDiscount(price: number, discount: number, quantity: number): number {
    if (discount <= 100) {
      return Math.round(price * quantity - ((price * quantity * discount) / 100));
    }
    else {
      return Math.round(quantity * (price - discount));
    }
  }


  // counterChanged() {
  //   this.store.dispatch(basketActionAdd({
  //     product: {
  //       id: this.product.id,
  //       goodName: this.product.goodParentDto?.name || '' + ' ' + this.product.brand?.name || '',
  //       goodPageUrl: this.product.pageUrl,
  //       brandName: this.product.brand?.name || '',
  //       price: this.product.userGroupPrices[0].price,
  //       discount: this.product.userGroupPrices[0].discount,
  //       finalPrice: this.calculatePriceAfterDiscount(this.product.userGroupPrices[0].price, this.product.userGroupPrices[0].discount, 1),
  //       count: this.basketList[0].count,
  //       imageUrl: (this.product.goodImageDtos) ? this.product.goodImageDtos[0].imageUrl : '',
  //       goodType: 0,
  //     }
  //   }));
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.basketUpdateSubscription?.unsubscribe();
  }
}
