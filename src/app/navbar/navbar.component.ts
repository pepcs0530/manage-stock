declare function require(path: string);
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imgPath = require('src/assets/images/header.png');
  isCollapsed = true;

  constructor() {}

  ngOnInit() {}
}
