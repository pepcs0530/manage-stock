import { Component, OnInit } from '@angular/core';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { Rice } from 'shared/models/member/rice';

@Component({
  selector: 'app-rice-list',
  templateUrl: './rice-list.component.html',
  styleUrls: ['./rice-list.component.css']
})
export class RiceListComponent implements OnInit {
  filteredRiceList: string[];
  riceList: Rice[];
  query:string
  constructor() { }

  ngOnInit() {
    this.riceList = [{id : "x0001",name : "ประทุม ๑" ,price : 100},{id : "x0002",name : "ประทุม ๒" ,price : 120}]
  }

  text: string;

  results: string[];

  search(event) {
    this.filteredRiceList = [];
    for(let i = 0; i < this.riceList.length; i++) {
        let rice = this.riceList[i];
        if(rice.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredRiceList.push(rice.name);
        }
    }
    this.results = this.filteredRiceList
  }
}
