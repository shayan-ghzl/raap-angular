import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Subscription } from 'rxjs';
import { basketActionAdd, basketActionRemove } from 'src/app/state/actions/basket.action';
import { AppState } from 'src/app/state/app.state';
import { Product } from '../../models/basket';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-checkout-item-card',
  templateUrl: './checkout-item-card.component.html',
  styleUrls: ['./checkout-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutItemCardComponent implements OnInit, OnDestroy {

  _product!: Product;
  productCount = 1;

  @Input() set product(value: Product) {
    this._product = value;
    this.productCount = value.count;
  }

  subscription = new Subscription();
  @Output() beforeUpdateRequest = new EventEmitter<boolean>(false);
  constructor(private store: Store<AppState>, private basketService: BasketService) {
  }

  ngOnInit(): void {
  }

  removeProduct() {
    if (confirm(`Are You Sure ? ${this._product.goodName}`)) {
      this.beforeUpdateRequest.emit(true);
      this.subscription.add(
        this.basketService.updateBasket({
          ...this._product,
          count: 0
        }).pipe(
          finalize(() => {
            this.beforeUpdateRequest.emit(false);
          })
        ).subscribe({
          next: (response) => {
            this.store.dispatch(basketActionRemove({ productId: this._product.id }));
          },
          error: (error) => {
            console.log(error);
          }
        })
      );
    }
  }
  // update basket functions
  basketUpdateSubscription!: Subscription;
  addToBasket(count: number) {
    this.basketUpdateSubscription?.unsubscribe();
    this.beforeUpdateRequest.emit(true);
    this.basketUpdateSubscription = this.basketService.updateBasket({ ...this._product, count: count }).pipe(
      finalize(() => {
        this.beforeUpdateRequest.emit(false);
      })
    ).subscribe({
      next: (response) => {
        if (count == 0) {
          this.store.dispatch(basketActionRemove({ productId: this._product.id }));
        } else {
          this.store.dispatch(basketActionAdd({ product: { ...this._product, count: count } }));
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.basketUpdateSubscription?.unsubscribe();
  }
}
