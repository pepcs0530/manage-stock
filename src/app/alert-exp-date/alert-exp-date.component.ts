import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@shared/models/product/product';
import { NotificationService } from '../notification/services/notification/notification.service';

@Component({
  selector: 'app-alert-exp-date',
  templateUrl: './alert-exp-date.component.html',
  styleUrls: ['./alert-exp-date.component.css']
})
export class AlertExpDateComponent implements OnInit {
  constructor(
    private notificationService: NotificationService
  ) { }

  @Input()
  display: Boolean;

  notifications: Product[];

  ngOnInit() {
    this.initNotification();
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
