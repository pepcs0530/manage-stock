declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { NotificationService } from './services/notification/notification.service';
import { Product } from '@shared/models/product/product';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from '../login/services/login/login.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationForm: FormGroup;
  notifications: Product[];
  authenFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router, private loginService: LoginService
  ) {
    if (this.loginService.isHaveSession()) {
      this.authenFlag = true;
      this.router.navigate(['/notification']);
    } else {
      this.authenFlag = false;
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.initForm();
    this.initNotification();
  }

  initForm() {
    this.notificationForm = this.formBuilder.group({
      keyword: [null]
    });
  }

  initNotification() {
    this.notificationService.getNotifications().subscribe(
      resultArray => {
        this.notifications = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  filterGlobal(value) {
    console.log('keyword-->', this.notificationForm.get('keyword').value);
    console.log('keyword-->', value);

    const condition = {
      keyword: value
    };

    this.notificationService.getNotificationsByCondition(condition).subscribe(
      resultArray => {
        this.notifications = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }
}
