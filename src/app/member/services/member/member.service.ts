import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Member } from '@shared/models/member/member';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseConfig } from '@config/database/database.config';
import { BaseFactoryService } from '@libs/utils/services/base-factory/base-factory.service';

@Injectable()
export class MemberService {
  private _getURL: string;
  /* private http: Http;
  private config: DatabaseConfig;
 */

  /* constructor(protected factoryService: BaseFactoryService) {
    // super(factoryService);
  } */

  constructor(private http: Http, private config: DatabaseConfig) {
    this._getURL = 'http://' + config.host + ':' + config.port + '/api/member';
    console.log(this._getURL)
  }

  /* constructor() {
    this._getURL =
      'http://' +
      this.config.database.host +
      ':' +
      this.config.database.port +
      '/api/member';
  } */

  getMembers(): Observable<Member[]> {
    /* const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    }); */
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get('/api/member', options).pipe(
      map(res => {
        return <Member[]>res.json();
      })
    );
  }

  getMemberByCondition(condition): Observable<Member[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('condition-->', condition);
    const body = JSON.stringify(condition);
    console.log('body-->', body);

    return this.http.post('/api/member', body, options).pipe(
      map(res => {
        return <Member[]>res.json();
      })
    );
  }
}
