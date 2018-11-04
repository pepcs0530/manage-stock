import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../../node_modules/rxjs';
import { Product } from '@shared/models/product/product';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _getURL: string;

  constructor(private http: Http, private config: DatabaseConfig) {
    /* this._getURL =
      'http://' + config.host + ':' + config.port + '/api/notification'; */
  }

  getNotifications(): Observable<Product[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get('/api/notification', options).pipe(
      map(res => {
        return <Product[]>res.json();
      })
    );
  }

  getNotificationsByCondition(condition): Observable<Product[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('condition-->', condition);

    return this.http
      .post('/api/notification/getNotificationByCondition', condition, options)
      .pipe(
        map(res => {
          return <Product[]>res.json();
        })
      );
  }
}
