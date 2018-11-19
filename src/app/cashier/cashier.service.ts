import { Injectable } from '@angular/core';
import { Headers,RequestOptions, Http } from '@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { map } from 'rxjs/operators';
import { Member } from '@shared/models/member/member';
import { Customer } from '@shared/models/cashier/customer';
import { Order } from '@shared/models/cashier/order';
import { Observable, from } from 'rxjs';
import { Product } from '@shared/models/product/product';

@Injectable({
  providedIn: 'root'
})
export class CashierService {  
  private _getURL: string;

  constructor(private http: Http, private config: DatabaseConfig) {
    this._getURL = 'http://' + config.host + ':' + config.port + '/api/saveOrder';
  }

  searchCustomersByName (keyword:string) : Observable <Customer[]>
  {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/api/order/searchCustomersByName', {keyword:keyword},options).pipe(
      map(res => {
        return <Customer[]>res.json();
      })
    );
  }

  searchProductByName(keyword:string) : Observable<Product[]>{
    
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/api/order/searchProductByName', {keyword:keyword},options).pipe(
      map(res => {
        return <Product[]>res.json();
      })
    );
  }

  saveOrder(order:Order){
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/api/order/saveOrder', order,options).pipe(
      map(res => {
        return res;
      })
    );
  }
}
