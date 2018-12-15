declare function require(path: string);
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from '../login/services/login/login.service';
import { FormBuilder } from '../../../node_modules/@angular/forms';
import { User } from '@shared/models/user/user';

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

  @Input()
  currentUser: string;

  statMenuFlag: string;
  cashierMenuFlag: string;
  addProductComingMenuFlag: string;
  productMenuFlag: string;
  riceVarMenuFlag: string;
  memberMenuFlag: string;
  notiMenuFlag: string;
  permissionMenuFlag: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('currentUser-->', this.loginService.getCurrentUser());
    this.currentUser = this.loginService.getCurrentUser();
    console.log('currentUserSeq-->', this.loginService.getCurrentUserSeq());
    this.getCurrentUserProfile();
  }

  getCurrentUserProfile() {
    const key = this.loginService.getCurrentUserSeq();
    console.log('key-->', key);
    this.loginService.getUserProfileById(key).subscribe(
      resultArray => {
        // this.members = resultArray;
        console.log('Result CurrentUserProfile-->', resultArray);
        if (resultArray.length > 0) {
          this.statMenuFlag = resultArray[0]['stat_menu_flag'];
          this.cashierMenuFlag = resultArray[0]['cashier_menu_flag'];
          this.addProductComingMenuFlag = resultArray[0]['add_product_coming_menu_flag'];
          this.productMenuFlag = resultArray[0]['product_menu_flag'];
          this.riceVarMenuFlag = resultArray[0]['rice_var_menu_flag'];
          this.memberMenuFlag = resultArray[0]['member_menu_flag'];
          this.notiMenuFlag = resultArray[0]['noti_menu_flag'];
          this.permissionMenuFlag = resultArray[0]['permission_menu_flag'];
        }
      },
      error => console.log('Error :: ', error)
    );
  }

  logout() {
    document.cookie = 'sessionID' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('logout!');
    this.router.navigate(['/']);
  }
}
