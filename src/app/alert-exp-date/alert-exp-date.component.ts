import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-exp-date',
  templateUrl: './alert-exp-date.component.html',
  styleUrls: ['./alert-exp-date.component.css']
})
export class AlertExpDateComponent implements OnInit {
  constructor() {}

  @Input()
  display: Boolean;

  ngOnInit() {}
}
