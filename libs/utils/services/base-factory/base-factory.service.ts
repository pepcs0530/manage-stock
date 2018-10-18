import { Http } from '../../../../node_modules/@angular/http';
import { Injectable } from '../../../../node_modules/@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { DatabaseConfig } from '@config/database/database.config';

@Injectable({
  providedIn: 'root'
})
export class BaseFactoryService {
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _http: Http,
    private _config: DatabaseConfig
  ) {}

  get formBuilder() {
    return this._formBuilder;
  }
  get router() {
    return this._router;
  }
  get http() {
    return this._http;
  }
  get config() {
    return this._config;
  }
}
