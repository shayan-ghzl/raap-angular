import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Subscription } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { Good, IBrandDto, IGoodGroupDto, Product } from '../shared/models/basket';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { AppState } from '../state/app.state';
import { basketSelector } from '../state/selectors/basket.selector';
import { ApiService } from '../shared/services/api.service';
import { PrimaryMenu } from '../shared/models/ui-model';
import { OfflineStorageService } from '../shared/services/offline-storage.service';

// <swiper
//   [slidesPerView]="1"
//   [spaceBetween]="50"
//   [navigation]="true"
//   [pagination]="{ type: 'fraction' }"
//   [centeredSlides]="true"
//   [keyboard]="{
//     enabled: true
//   }"
//   [virtual]="true"
//   class="my-swiper"
// >
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  ordersList: Product[] = [];
  // ordersList$ = this.store.select(basketSelector);
  // in mobile version
  isPrimaryMenuActive = false;

  trendProducts: Good[] = [];
  hasTrendProducts = true;

  trendCategories: IGoodGroupDto[] = [];
  hasTrendCategories = true;

  config: SwiperOptions = {
    navigation: true,
    threshold: 24,
    pagination: { clickable: true },
    centeredSlides: false,
    breakpoints: {
      357: {
        slidesPerView: 1.5,
        spaceBetween: 10,
        centeredSlides: true,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 15,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: false,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 20,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 24,
        centeredSlides: false,
      }
    }
  };

  subscription = new Subscription();
  // for primary menu --- start
  categories: IGoodGroupDto[] = [];
  categoriesTree: IGoodGroupDto[] = [];
  // brands: IBrandDto[] = [];
  primaryMenu: PrimaryMenu[] = [
    {
      name: 'خودرو',
      routerLink: '',
      isActive: false,
      children: []
    },
    {
      name: 'دسته بندی ها',
      routerLink: '',
      isActive: false,
      children: []
    },
    {
      name: 'برند ها',
      routerLink: '',
      isActive: false,
      children: []
    },
    {
      name: 'درباره ما',
      routerLink: '',
      isActive: false,
      children: []
    },
  ];
  // for primary menu --- end
  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    // private idbService: IdbService,
    private offlineStorageService: OfflineStorageService
  ) { }

  // getCount(product: Good) {
  //   return this.ordersList.find(p => p.id == product.id)?.count || 0;
  // }


  ngOnInit(): void {
    this.offlineStorageService.getItems('products').then((value) => {
      console.log(value, 'offlineStorageService getItems');
    });
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
    this.setGoods();
    this.apiService.getGoodGroups().pipe(
      finalize(() => {
        if (this.trendCategories.length == 0) {
          this.hasTrendCategories = false;
        } else {
          this.hasTrendCategories = true;
        }
      })
    ).subscribe({
      next: (response) => {
        this.trendCategories = response.data;
        this.offlineStorageService.addItems('categories', <IGoodGroupDto[]>response.data).then((value) => {
          console.log(value, 'offlineStorageService addItems');
        });
        // this.idbService.addItems('categories', <IGoodGroupDto[]>response.data);
      },
      error: (error) => { console.log(error); },
    });
    // for primary menu --- start
    this.apiService.getGoodGroups().subscribe({
      next: (response) => {
        // for trend categories section
        this.categories = response.data;
        // for primary menu 
        this.primaryMenu[1].children = this.convertListToObjArray(1);
        this.primaryMenu[0].children = this.convertListToObjArray(2);
      },
      error: (error) => { console.log(error); },
    });
    this.apiService.getBrands({
      page: 1,
      per_page: -1,
    }).subscribe({
      next: (response) => {
        this.primaryMenu[2].children = (response.data.data as IBrandDto[]).map(p => ({
          name: p.name,
          routerLink: '/category/' + p.id,
          isActive: false,
          children: []
        }));
        this.offlineStorageService.addItems('brands', <IBrandDto[]>response.data.data).then((value) => {
          console.log(value, 'offlineStorageService addItems');
        });
        // this.idbService.addItems('brands', <IBrandDto[]>response.data.data);
      },
      error: (error) => { console.log(error); },
    });
    // for primary menu --- end
  }
  // for primary menu --- start
  convertListToObjArray(categoryId: number, parentId: number | null = null) {
    let temp: PrimaryMenu[] = [];
    this.categories.filter(p => (p.parent?.id || null) == parentId).forEach((Element) => {
      if (Element.goodGroupTypeDto.id == categoryId) {
        temp.push({
          name: Element.name,
          routerLink: '/category/' + Element.id,
          isActive: false,
          children: this.convertListToObjArray(categoryId, Element.id)
        });
      }
    });
    return temp;
  }
  // RAW FUNCTION
  // convertListToObjArray(parentId: number | null = null) {
  //   let temp: IGoodGroupDto[] = [];
  //   this.categories.filter(p => (p.parent?.id || null) == parentId).forEach((Element) => {
  //     temp.push({
  //       ...Element,
  //       children: this.convertListToObjArray(Element.id)
  //     });
  //   });
  //   return temp;
  // }
  // for primary menu --- end
  setGoods() {
    let temp = localStorage.getItem('time') || '';
    this.offlineStorageService.getItems('products').then((value: Good[]) => {
      if (!isNaN(+temp) && Math.abs(+temp - new Date().getTime()) < 3600000) {
        this.trendProducts = value;
        if (this.trendProducts.length != 0) return;
      }
      this.apiService.getGoods({
        page: 1,
        per_page: 10,
      }).pipe(
        finalize(() => {
          console.log('%cget good finalized', 'font-weight:bold;font-size:1rem;color:green');
          setTimeout(() => {
            if (this.trendProducts.length == 0) {
              this.hasTrendProducts = false;
            } else {
              this.hasTrendProducts = true;
            }
          }, 1000);
        })
      ).subscribe({
        next: (response) => {
          console.log(response);
          this.offlineStorageService.addItems('products', <Good[]>response.data.data).then((value) => {
            localStorage.setItem('time', new Date().getTime().toString());
            console.log(value, 'offlineStorageService addItems');
          });
          // this.idbService.addItems('products', <Good[]>response.data.data);
          this.trendProducts = response.data.data;
        },
        error: (error) => {
          console.log(error, 'error');
        }
      });
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent ngOnDestroy');
    this.subscription.unsubscribe();
  }

  // onSwiper(swiper: any) {
  //   console.log(swiper);
  // }

  // onSlideChange() {
  //   console.log('slide change');
  // }

}