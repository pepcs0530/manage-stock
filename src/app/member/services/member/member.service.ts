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
    console.log(this._getURL);
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

  addMember(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(payload);
    console.log('body-->', body);

    return this.http.post('/api/member/add', payload, options);
  }

  getMemberByCondition(condition): Observable<Member[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('condition-->', condition);

    return this.http.post('/api/member', condition, options).pipe(
      map(res => {
        return <Member[]>res.json();
      })
    );
  }

  getMemberById(id: number): Observable<Member[]> {
    /* const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    }); */
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.get('/api/member/getMemberById/' + id, options).pipe(
      map(res => {
        return <Member[]>res.json();
      })
    );
  }

  editMember(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(payload);
    console.log('body-->', body);

    const id = payload['memberSeq'];

    return this.http.put('/api/member/edit/' + id, payload, options);
  }

  deleteMember(key: number) {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('key-->', key);

    return this.http.delete('/api/member/deleteById/' + key);
  }
}
