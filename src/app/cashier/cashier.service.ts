import { Injectable } from '@angular/core';
import { Headers,RequestOptions, Http } from '@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { map } from 'rxjs/operators';
import { Member } from '@shared/models/member/member';
import { Customer } from '@shared/models/cashier/customer';
import { Order } from '@shared/models/cashier/order';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashierService {  
  private _getURL: string;

  constructor(private http: Http, private config: DatabaseConfig) {
    this._getURL = 'http://' + config.host + ':' + config.port + '/api/saveOrder';
  }

  getCustomersByKeyword (keyword:string) : Observable <Customer[]>
  {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/api/order/getCustomersByKeyword', {keyword:keyword},options).pipe(
      map(res => {
        return <Customer[]>res.json();
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
