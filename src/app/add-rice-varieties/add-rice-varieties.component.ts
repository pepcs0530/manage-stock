declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { Rice } from '@shared/models/member/rice';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { AddRiceVarietiesService } from './services/add-rice-varieties/add-rice-varieties.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-add-rice-varieties',
  templateUrl: './add-rice-varieties.component.html',
  styleUrls: ['./add-rice-varieties.component.css']
})
export class AddRiceVarietiesComponent implements OnInit {
  imgPath = require('src/assets/images/rice.jpg');
  riceList: Rice[];

  decimalWithDigits: RegExp = /^[0-9\.]+$/;

  addRiceVarietieForm: FormGroup;

  constructor(private addRiceVarietiesService: AddRiceVarietiesService) {}

  ngOnInit() {
    this.initForm();
    this.riceList = [
      { id: 'x0001', name: 'ประทุม ๑', price: 100 },
      { id: 'x0002', name: 'ประทุม ๒', price: 120 }
    ];
  }

  initForm() {
    this.addRiceVarietieForm = new FormGroup({
      riceVarId: new FormControl(),
      riceVarName: new FormControl(),
      price: new FormControl()
    });
  }

  onSubmit() {
    console.log('payload-->', this.addRiceVarietieForm.value);

    const payload = {
      ...this.addRiceVarietieForm.value
    };

    console.log('payload-->', payload);
    this.addRiceVarietiesService.addRiceVarieties(payload).subscribe(
      data => {
        alert('เพิ่มข้อมูลเรียบร้อย');
      },
      error => {
        console.error('Error adding data!');
        return Observable.throw(error);
      }
    );
  }

  onReset() {
    this.addRiceVarietieForm.reset();
  }
}
