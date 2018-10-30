import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../../node_modules/rxjs';
import { RiceVarieties } from '@shared/models/rice-varieties/rice-varieties';

@Injectable({
  providedIn: 'root'
})
export class RiceService {
  constructor(private http: Http, private config: DatabaseConfig) {}

  getRiceVarietiesByCondition(condition): Observable<RiceVarieties[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('condition-->', condition);

    return this.http
      .post(
        '/api/riceVarieties/getRiceVarietiesByCondition',
        condition,
        options
      )
      .pipe(
        map(res => {
          return <RiceVarieties[]>res.json();
        })
      );
  }
}
