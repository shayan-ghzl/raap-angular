import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxImageZoomComponent } from 'ngx-image-zoom';
import { map, Subscription } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Good, Product } from '../shared/models/basket';
import { BasketService } from '../shared/services/basket.service';
import { basketActionAdd, basketActionRemove } from '../state/actions/basket.action';
import { AppState } from '../state/app.state';
import { basketSelector } from '../state/selectors/basket.selector';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleProductComponent implements OnInit, OnDestroy {
  // @ViewChild(SwiperComponent) swiper!:SwiperComponent;
  // @ViewChild(NgxImageZoomComponent) zoom!:NgxImageZoomComponent;

  product!: Good;
  productCount = 0;
  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 0,
    threshold: 10,
    observer: true,
    observeParents: true,
    breakpoints: {
      768: {
        pagination: { clickable: false },
      },
    }
  };
  subscription = new Subscription();


  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService
  ) {

  }

  ngOnInit(): void {
    // this.breakpointObserver.observe(['(min-width: 993px)']).subscribe(() => {
    //   // this.swiper?.init();
    //   // this.swiper?.slideReset();
    // });
    //  console.log(this.activatedRoute.snapshot.paramMap.get('id'), 'snapshot');



    this.subscription.add(
      this.activatedRoute.data.subscribe(params => {
        this.product = params['product'].data;
        console.log(this.product);
      })
    );
    this.subscription.add(
      this.store.select(basketSelector).subscribe({
        next: (response) => {
          this.productCount = response.find(p => p.id == this.product.id)?.count || 0;
        },
        error: (error) => {
          console.log(error);
        }
      })
    );

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
    this.basketUpdateSubscription = this.basketService.updateBasket(temp).subscribe({
      next: (response) => {
        if (count == 0) {
          this.store.dispatch(basketActionRemove({ productId: temp.id }));
        } else {
          this.store.dispatch(basketActionAdd({ product: temp }));
        }
      },
      error: (error) => {
        console.log(error, 'Error');
      }
    });
  }

  calculatePriceAfterDiscount(price: number, discount: number, quantity: number): number {
    if (discount <= 100) {
      return Math.round(price * quantity - ((price * quantity * discount) / 100));
    } else {
      return Math.round(quantity * (price - discount));
    }
  }

  swiper: any;
  onSwiper(swiper: any) {
    this.swiper = swiper;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.basketUpdateSubscription?.unsubscribe();
  }

}
