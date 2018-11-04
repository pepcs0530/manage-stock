import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private _getURL: string;

  constructor(private http: Http, private config: DatabaseConfig) {
    this._getURL =
      'http://' + config.host + ':' + config.port + '/api/addProduct';
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

    return this.http.post('/api/addProduct/create', payload, options);
    // .map(res => res.json());
  }

  getProductByLotId(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    /* const body = JSON.stringify(payload);
    console.log('body-->', body); */

    return this.http
      .get(`/api/product/getProductByLotId/${payload}`, options)
      .pipe(map(res => res.json()));
  }
}
