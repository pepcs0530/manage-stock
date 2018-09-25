declare function require(path: string);
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  imgPath = require('src/assets/images/banner.jpg');

  constructor() {}

  ngOnInit() {}
}
