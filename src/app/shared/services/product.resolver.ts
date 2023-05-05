import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Good } from '../models/basket';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<{ data: Good } | string> {

  constructor(private apiService: ApiService, private router: Router) {
  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ data: Good } | string> {
    let temp = this.router.getCurrentNavigation()?.extras.state;
    if (temp) {
      return of({ data: temp as Good })
    }
    return this.apiService.getGoodById(activatedRouteSnapshot.params['id']).pipe(
      catchError(() => {
        this.router.navigate(['/']);
        return of('data not available at this time');
      })
    );
  }
}
