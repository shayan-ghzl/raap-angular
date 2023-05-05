import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from '../shared/models/basket';
import { FormGenerator } from '../shared/models/ui-model';
import { basketCalculationSelector, basketSelector } from '../state/selectors/basket.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {

  descFormTemplate: FormGenerator[] = [
    {
      fieldAttribute: {
        type: 'textarea',
        formControlName: 'description',
        value: '',
        isDisabled: false,
      },
      label: 'توضیحات',
      containerClass: 'form-field',
      fieldErrorMessage: 'حداقل 6 و حداکثر 12 حرف مجاز است',
      validation: {
        maxLength: 120,
      }
    },
  ];
  buttonSpinnerSwitch = false;

  checkoutList$ = this.store.select(basketSelector);
  basketCalculation$ = this.store.select(basketCalculationSelector);

  constructor(private store: Store) {
  }

  submitHandler(formGroup: FormGroup) {
    console.log(formGroup);
  }

  identify(index: number, item: Product) {
    return item.id;
  }

}
