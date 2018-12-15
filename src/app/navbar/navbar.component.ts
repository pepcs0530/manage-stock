declare function require(path: string);
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from '../login/services/login/login.service';
import { FormBuilder } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imgPath = require('src/assets/images/header.png');
  isCollapsed = true;

  @Input()
  authenFlag: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('currentUser-->', this.loginService.getCurrentUser());
  }

  logout() {
    document.cookie = 'sessionID' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('logout!');
    this.router.navigate(['/']);
  }
}
