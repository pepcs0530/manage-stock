declare function require(path: string);
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./searchproduct.component.css']
})
export class SearchproductComponent implements OnInit {
  imgPath = require('src/assets/images/rice2.jpg');

  constructor() {}

  ngOnInit() {}
}
