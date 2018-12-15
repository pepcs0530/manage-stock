import { Injectable } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { User } from '@shared/models/user/user';
import { Observable } from 'rxjs';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { map } from '../../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ses_value: string;
  ses_nameValue: string;

  constructor(private router: Router, private http: Http) { }

  isHaveSession(): Boolean {
    const cookie = document.cookie.split(';');
    let i = 0;
    let cookieValue = null;
    let cookieNameValue = null;
    for (; i < cookie.length; i++) {
      if (cookie[i].split('=')[0].trim() === 'sessionID') {
        cookieValue = cookie[i].split('=')[1];
        this.ses_value = cookieValue;
        cookieNameValue = cookie[i].split('=')[2];
        this.ses_nameValue = cookieNameValue;
        break;
      }
    }
    if (cookieValue === undefined || cookieValue === null) {
      console.log('cookieValue-->', cookieValue);
      // this.router.navigate(['/']);
      return false;
    } else {
      console.log('cookieValue-->', cookieValue);
      const myRes = atob(cookieValue).split('??');
      console.log('myRes-->', myRes);
      return true;
      // this.router.navigate(['/members']);
    }
  }

  checkUserProfile(condition): Observable<User[]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });

    const options = new RequestOptions({ headers: headers });
    console.log('condition-->', condition);

    return this.http.post('/api/login/checkUserProfile', condition, options).pipe(
      map(res => {
        return <User[]>res.json();
      })
    );
  }

  getCurrentUser(): string {
    return document.cookie.split('=')[2];
  }
}
