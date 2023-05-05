import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription, tap } from 'rxjs';
import { Good, Product } from '../shared/models/basket';
import { ApiService } from '../shared/services/api.service';
import { AppState } from '../state/app.state';
import { basketSelector } from '../state/selectors/basket.selector';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ArchiveComponent implements OnInit, OnDestroy {

  ordersList: Product[] = [];
  products: Good[] = [];
  hasProducts = true;
  subscription = new Subscription();

  constructor(private store: Store<AppState>, private apiService: ApiService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(basketSelector).subscribe({
        next: (response) => {
          this.ordersList = response;
        },
        error: (error) => {
          console.log(error);
        }
      })
    );
    this.subscription.add(
      this.apiService.getGoods({
        page: 7,
        per_page: 5
      }).subscribe({
        next: (response) => {
          console.log(response, 'response');
          console.log(response.data.data, 'response');
          this.products = response.data.data;
          if (this.products.length == 0) {
            this.hasProducts = false;
          } else {
            this.hasProducts = true;
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    );


  //  data$ = this.apiService.getGoods({
  //     page: 1,
  //     per_page: 5
  //   }).pipe(
  //     map(p => p.data.data)
  //   );

  }

  // getCount(product: Good) {
  //   return this.ordersList.find(p => p.id == product.id)?.count || 0;
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
