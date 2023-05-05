import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, shareReplay, take, tap, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Good, IGoodGroupDto } from '../models/basket';
import { Parameter } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getGoods(parameters: Parameter) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    return this.http.post<any>(environment.apiUrl + 'Goods/GetGoods', {}, { params: params }).pipe(
      take(1),
      timeout(10000)
    );
  }

  getBrands(parameters: Parameter) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    return this.http.get<any>(environment.apiUrl + 'Goods/GetBrands', { params: params }).pipe(
      take(1),
      timeout(10000)
      // tap(value => console.log('%cgetBrands', 'font-weight:bold;font-size:0.85rem;color:#ff0000;', value)),
      //  delay(3000),
      // tap(console.log),
    );
  }

  getGoodById(id: string) {
    return this.http.get<{ data: Good }>(environment.apiUrl + 'Goods/GetGoodById', { params: new HttpParams().append('id', id) }).pipe(
      // tap(value => console.log('%cgetGoodById', 'font-weight:bold;font-size:0.85rem;color:#ff0000;', value)),
      // delay(3000),
      // tap(console.log),
    );
  }

  getGoodGroups() {
    return this.http.get<{ data: IGoodGroupDto[] }>(environment.apiUrl + 'GoodGroups/GetGoodGroups').pipe(
      take(1),
      timeout(10000)
      // tap(value => {
      //   console.log('%cgetGoodGroups', 'font-weight:bold;font-size:0.75rem;color:#2196f3;', value)
      // }),
      //  delay(3000),
    );
  }

}
