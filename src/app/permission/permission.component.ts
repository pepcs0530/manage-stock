import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login/login.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  authenFlag: boolean;

  constructor(private router: Router, private loginService: LoginService) {
    if (this.loginService.isHaveSession()) {
      this.authenFlag = true;
      this.router.navigate(['/permission']);
    } else {
      this.authenFlag = false;
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
