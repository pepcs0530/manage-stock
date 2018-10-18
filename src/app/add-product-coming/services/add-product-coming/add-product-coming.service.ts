import { Injectable } from '@angular/core';
import { DatabaseConfig } from '@config/database/database.config';
import { Headers, RequestOptions, Response, Http } from '@angular/http';

@Injectable()
export class AddProductComingService {
  private _getURL: string;

  constructor(private http: Http, private config: DatabaseConfig) {
    this._getURL =
      'http://' + config.host + ':' + config.port + '/api/addProductComing';
  }

  addProductComing(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(payload);
    console.log('body-->', body);

    return this.http.post('/api/addProductComing/create', payload, options);
    // .map(res => res.json());
  }
}
