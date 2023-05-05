import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IBrandDto, IGoodGroupDto, Product } from 'src/app/shared/models/basket';
import { PrimaryMenu } from 'src/app/shared/models/ui-model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppState } from 'src/app/state/app.state';
import { basketSelector } from 'src/app/state/selectors/basket.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {

  ordersList: Product[] = [];
  // IN MOBILE VERSION
  isPrimaryMenuActive = false;

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
  constructor(private store: Store<AppState>, private apiService: ApiService) {
  }


  subscription = new Subscription();
  ngOnInit(): void {
    this.subscription.add(
      this.store.select(basketSelector).subscribe({
        next: (response) => {
          this.ordersList = response;
          // this.loadComponent?.ordersList = response;
        },
        error: (error) => {
          console.log(error);
        }
      })
    );
    // for primary menu --- start
    this.subscription.add(
      this.apiService.getGoodGroups().subscribe({
        next: (response) => {
          // for trend categories section
          this.categories = response.data;
          // for primary menu 
          this.primaryMenu[1].children = this.convertListToObjArray(1);
          this.primaryMenu[0].children = this.convertListToObjArray(2);
        },
        error: (error) => { console.log(error); },
      })
    );


    this.subscription.add(
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
          })
          );
        },
        error: (error) => { console.log(error); },
      })
    );
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
  // handleRouterActivation(component: Component) {
  //   if (component instanceof CheckoutComponent) {
  //     this.loadComponent = component;
  //   }
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
