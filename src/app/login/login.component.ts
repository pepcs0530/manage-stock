import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Member } from 'shared/models/member/member';
import { LoginService } from './services/login/login.service';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  data = <any>{
    username: null,
    password: null
  };

  member: Member[];

  ses_value: string;
  ses_nameValue: string;
  authenFlag: boolean;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) {
    if (this.loginService.isHaveSession()) {
      this.authenFlag = true;
    } else {
      this.authenFlag = false;
      this.router.navigate(['/']);
    }
    console.log('constructor-->', this.authenFlag);
  }

  ngOnInit() {
    console.log('ngOnInit-->', this.authenFlag);
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }

  checkAuthen() {
    const x = document.cookie.split(';');
    let i = 0;
    let cookieValue = null;
    let cookieNameValue = null;
    for (; i < x.length; i++) {
      if (x[i].split('=')[0].trim() === 'sessionID') {
        cookieValue = x[i].split('=')[1];
        this.ses_value = cookieValue;
        cookieNameValue = x[i].split('=')[2];
        this.ses_nameValue = cookieNameValue;
        break;
      }
    }
    if (cookieValue === undefined || cookieValue === null) {
      console.log('cookieValue-->', cookieValue);
      this.router.navigate(['/']);
    } else {
      console.log('cookieValue-->', cookieValue);
      const myRes = atob(cookieValue).split('??');
      console.log('myRes-->', myRes);
    }
  }

  formSubmit() {
    console.log(this.data);

    const uname = this.data.username;
    const pass = this.data.password;

    if (uname === undefined || pass === undefined) {
      alert('กรุณากรอก username / password ให้ถูกต้อง');
      return false;
    }

    const key = btoa(btoa(uname) + '??' + btoa(pass));

    console.log(key);
    document.cookie = 'sessionID=' + key + ';';

    // console.log(this.getMemberByUsernamePassword(this.data));
  }

  //// get members by username password
  /* getMemberByUsernamePassword(data): any {
    console.log(data.username);
    console.log(data.password);

    const findMember = {
      mem_uname: this.data.username,
      mem_pass: this.data.password
    };
    return this.memberService.getMemberByUsernamePassword(findMember).subscribe(
      //resultArray => {
      //      //this.members = resultArray;
      //      console.log(resultArray);
      //      this.member = resultArray;
      //      console.log(this.member);
      //    },
      res => {
        console.log(res);
        if (res[0] != null) {
          document.cookie +=
            'userName=' +
            res[0].mem_tname +
            '' +
            res[0].mem_fname +
            ' ' +
            res[0].mem_lname +
            ';';
          console.log('login successfully, welcome ' + res[0].mem_fname);
          this.router.navigate(['/members']);
        } else {
          console.log('login failed, try again');
          alert('กรุณาตรวจสอบ username / password');
          this.router.navigate(['/']);
        }
      },
      error => console.log('Error :: ' + error)
    );
  } */
}
