import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Product } from '@shared/models/product/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '@shared/models/customer/customer';

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

  addProduct(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(payload);
    console.log('body-->', body);

    return this.http.post('/api/product/add', payload, options);
  }

  editProduct(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(payload);
    console.log('body-->', body);

    const id = payload['productSeq'];

    return this.http.put('/api/product/edit/' + id, payload, options);
  }

  getProductById(id: number): Observable<Product[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get('/api/product/getProductById/' + id, options).pipe(
      map(res => {
        return <Product[]>res.json();
      })
    );
  }

  getCustomerListByProductSeq(id: number): Observable<Customer[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get('/api/customer/getCustomerListByProductSeq/' + id, options).pipe(
      map(res => {
        return <Customer[]>res.json();
      })
    );
  }

  deleteProduct(key: number) {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('key-->', key);

    return this.http.delete('/api/product/deleteById/' + key);
  }
}
