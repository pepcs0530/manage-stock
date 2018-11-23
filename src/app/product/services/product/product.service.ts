import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Product } from '@shared/models/product/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProductByCondition(condition): Observable<Product[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('condition-->', condition);

    return this.http.post('/api/product', condition, options).pipe(
      map(res => {
        return <Product[]>res.json();
      })
    );
  }
}
