import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/basket';

@Pipe({
  name: 'checkProductCount',
})
export class CheckProductCountPipe implements PipeTransform {

  transform(value: string, ordersList: Product[]): number {
    return ordersList.find(p => p.id == value)?.count || 0;
  }

}
