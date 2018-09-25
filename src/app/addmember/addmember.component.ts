declare function require(path: string);
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  imgPath = require('src/assets/images/rice.jpg');

  constructor() {}

  ngOnInit() {}
}
