declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  imgPath = require('src/assets/images/rice.jpg');

  constructor() {}

  ngOnInit() {}
}
