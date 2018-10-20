import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Member } from '@shared/models/member/member';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseConfig } from '@config/database/database.config';

@Injectable()
export class AddmemberService {
  private _getURL: string;

  constructor(private http: Http, private config: DatabaseConfig) { 
    this._getURL = 'http://' + config.host + ':' + config.port + '/api/member';
    console.log(this._getURL)
  }

  Add(formData:Member):Observable<String> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log(formData)
    return this.http.post('/api/member/addmember',formData, options).pipe(
      map(res => {
        return <string>res.json();
      }))
  }
}
