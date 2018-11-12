import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../../node_modules/rxjs';
import { RiceVarieties } from '@shared/models/rice-varieties/rice-varieties';

@Injectable({
  providedIn: 'root'
})
export class RiceVarietiesService {
  constructor(private http: Http) {}

  addRiceVarieties(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(payload);
    console.log('body-->', body);

    return this.http.post('/api/riceVarieties/add', payload, options);
  }

  editRiceVarieties(payload) {
    console.log('payload-->', payload);
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(payload);
    console.log('body-->', body);

    const id = payload['riceVarSeq'];

    return this.http.put('/api/riceVarieties/edit/' + id, payload, options);
  }

  deleteRiceVarietie(key: number) {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('key-->', key);

    return this.http.delete('/api/riceVarieties/deleteById/' + key);
  }

  getRiceVarietieById(id: number): Observable<RiceVarieties[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get('/api/riceVarieties/getRiceVarietieById/' + id, options)
      .pipe(
        map(res => {
          return <RiceVarieties[]>res.json();
        })
      );
  }
}
