import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '@shared/models/customer/customer';
import { Product } from '@shared/models/product/product';

@Injectable()
export class StatService {

  constructor(
    private http: Http
  ) { }

  getStatRiceVarietiesByCondition(yyyymm: string): Observable<Product[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get('/api/stat/getStatRiceVarietiesByCondition/' + yyyymm, options).pipe(
      map(res => {
        return <Product[]>res.json();
      })
    );
  }
}
