import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { basketActionRemove } from 'src/app/state/actions/basket.action';
import { AppState } from 'src/app/state/app.state';
import { Product } from '../../models/basket';
import { FormGenerator } from '../../models/ui-model';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {

  @Output() hamburgerPressed = new EventEmitter<void>();
  formGenerator: FormGenerator[] = [
    {
      fieldAttribute: {
        type: 'text',
        placeholder: 'نام کاربری',
        formControlName: 'username',
        value: '',
        isDisabled: false,
      },
      label: 'نام کاربری',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
        minLength: 6,
        maxLength: 12,
      }
    },
    {
      fieldAttribute: {
        type: 'password',
        placeholder: 'کلمه عبور',
        formControlName: 'password',
        value: '',
        isDisabled: false,
        hasTogglePassword: true
      },
      label: 'کلمه عبور',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        isRequired: true,
        minLength: 6,
        maxLength: 12,
      }
    },
    {
      fieldAttribute: {
        type: 'checkbox',
        formControlName: 'remember_me',
        value: true,
        isDisabled: false,
      },
      label: 'مرا بخاطر بسپار',
      containerClass: 'form-binary',
    },
  ];

  @Input() productsList: Product[] = [];

  userDropdownMenu = [
    {
      name: 'سفارش های من',
      icon: 'icon-user-icon',
      routerLink: '/my-account'
    },
    {
      name: 'خروج از حساب کاربری',
      icon: 'icon-user-icon',
      routerLink: '/home'
    },
  ];
  // disableSave!: Observable<boolean>;
  // currentObject!: any

  // subscription = new Subscription();
  // constructor(private store: Store<{ basket: { orders: Product[] } }>) { }

  constructor(private basketService: BasketService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.subscription.add(
    //   this.store.select(basketSelector).subscribe({
    //     next: (value) => {
    //       console.log(value, 'basketSelector');
    //       this.productsList = value;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }
    //   })
    // );
    // this.subscription.add(
    //   this.basketService.deleteBasket('1c0c1b01-464d-ec11-b694-b2d24167b1eb').subscribe({
    //     next: (value) => {
    //       console.log(value);
    //     }
    //   })
    // );
  }

  loginPopupFormSubmitHandler(formGroup: FormGroup) {
    formGroup.setErrors({ 'incorrect': true });
    console.log(formGroup.controls, 'loginPopupFormSubmitHandler');
  }

  // ngOnDestroy(): void {
  //   this.theSubscription?.unsubscribe();
  // }

  removeProduct(product: Product) {
    if (confirm(`Are You Sure ? ${product.goodName}`)) {
        this.basketService.updateBasket({
          ...product,
          count: 0
        }).subscribe({
          next: (response) => {
            // console.log(response);
            this.store.dispatch(basketActionRemove({ productId: product.id }));
          },
          error: (error) => {
            console.log(error);
          }
        })
    }
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
