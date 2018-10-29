declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { NotificationService } from './services/notification/notification.service';
import { Product } from '@shared/models/product/product';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationForm: FormGroup;
  notifications: Product[];

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

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
}
