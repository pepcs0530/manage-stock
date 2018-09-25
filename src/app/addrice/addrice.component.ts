declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { Rice } from 'shared/models/member/rice';

@Component({
  selector: 'app-addrice',
  templateUrl: './addrice.component.html',
  styleUrls: ['./addrice.component.css']
})
export class AddriceComponent implements OnInit {
  imgPath = require('src/assets/images/rice.jpg');
  riceList : Rice[];

  constructor() {}

  ngOnInit() {

    this.riceList = [{id : "x0001",name : "ประทุม ๑" ,price : 100},{id : "x0002",name : "ประทุม ๒" ,price : 120}]
  }
}
