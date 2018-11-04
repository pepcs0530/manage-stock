import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { AddProductService } from './services/add-product/add-product.service';
import { Message } from '../../../node_modules/primeng/components/common/message';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  msgs: Message[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private addProductService: AddProductService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addProductForm = this.formBuilder.group({
      lotId: [null],
      riceVarieties: [null],
      productQuantity: [null],
      mfdDate: [null],
      expDate: [null]
    });
  }

  save() {
    console.log('addProductForm-->', this.addProductForm.value);
    const payload = {
      ...this.addProductForm.value
    };

    console.log('payload-->', payload);
    this.addProductService.addProduct(payload).subscribe(
      data => {
        alert('เพิ่มข้อมูลเรียบร้อย');
      },
      error => {
        console.error('Error adding data!');
        return Observable.throw(error);
      }
    );
  }

  reset() {
    this.addProductForm.reset();
  }

  getRiceVarities(lotId) {
    console.log('getRiceVarities-->', lotId);
    /* const condition = {
      keyword: id
    };
    console.log('condition-->', condition);*/
    /* this.addProductService.getProductByLotId(condition).subscribe(data => {
      // console.log('data-->', data);
      // this.results = data.map(key => key.member_name);
      // this.results = data;
      // this.display = data.map(key => key.member_name);
    }); */
    this.addProductService.getProductByLotId(lotId).subscribe(data => {
      console.log('data-->', data[0]);
      if (data[0]) {
        console.log('t');
        this.msgs = [];
        this.addProductForm
          .get('riceVarieties')
          .setValue(data[0].rice_varieties);
      } else {
        console.log('f');
        this.addProductForm.get('riceVarieties').setValue(null);
        this.msgs = [];
        /* this.msgs.push({
          severity: 'error',
          summary: 'แจ้งเตือนจากระบบ',
          detail: 'ไม่พบข้อมูลจาก lot id นี้'
        }); */
        alert('ไม่พบข้อมูลจาก lot id นี้');
      }
    });
  }
}
