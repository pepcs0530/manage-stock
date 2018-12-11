import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { dateToStrYYYYMMDD } from '@shared/utils/date-to-str-yyyymmdd';
import { ProductService } from './services/product/product.service';
import { Product } from '@shared/models/product/product';
import { AddProductService } from '../add-product/services/add-product/add-product.service';
import { Observable } from '../../../node_modules/rxjs';
import { tap, finalize } from '../../../node_modules/rxjs/operators';
import { Customer } from '@shared/models/customer/customer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  products: any[];
  selectedProduct: Product;

  saveProductForm: FormGroup;
  product: any;
  newProduct: boolean;
  displayDialog: boolean;
  message = [];

  customers: any[];
  selectedCustomer: Customer;

  disableMfdDate: boolean;
  disableExpDate: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private addProductService: AddProductService
  ) { }

  ngOnInit() {
    this.initForm();
    this.search();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      // keyword: [null]
      lotId: [null],
      productId: [null],
      productName: [null],
      memberName: [null],
      riceVarieties: [null],
      mfdDate: [null],
      expDate: [null]
    });

    this.saveProductForm = this.formBuilder.group({
      productSeq: [null],
      lotId: [null],
      riceVarSeq: [null],
      riceVarieties: [null],
      productQuantity: [null],
      mfdDate: [null],
      expDate: [null],
      memberSeq: [null],
      price: [null],
      member: [null]
    });

    /* this.saveProductForm.get('mfdDate').setValue(new Date());
    this.saveProductForm.get('expDate').setValue(new Date()); */
  }

  search() {
    console.log('productForm-->', this.productForm.value);
    console.log('mfdDate-->', dateToStrYYYYMMDD(this.productForm.get('mfdDate').value));
    console.log('expDate-->', dateToStrYYYYMMDD(this.productForm.get('expDate').value));

    const payload = {
      lotId: this.productForm.get('lotId').value,
      productId: this.productForm.get('productId').value,
      productName: this.productForm.get('productName').value,
      mfdDate: dateToStrYYYYMMDD(this.productForm.get('mfdDate').value),
      expDate: dateToStrYYYYMMDD(this.productForm.get('expDate').value),
      memberName: this.productForm.get('memberName').value,
    };

    console.log('payload-->', payload);

    this.productService.getProductByCondition(payload).subscribe(
      resultArray => {
        this.products = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  onRowSelect(event) {
    console.log('onRowSelect-->', event);
    this.newProduct = false;
    this.product = this.setDataToEdit(event.data);
    console.log('setDataToEdit-->', this.product);
    this.saveProductForm.patchValue({
      productSeq: this.product['product_seq'],
      lotId: this.product['lot_id'],
      riceVarieties: this.product['rice_var_name'],
      productQuantity: this.product['product_quantity'],
      mfdDate: this.product['mfd_date'] ? new Date(this.product['mfd_date']) : null,
      expDate: this.product['exp_date'] ? new Date(this.product['exp_date']) : null,
      riceVarSeq: this.product['rice_var_seq'],
      memberSeq: this.product['member_seq'],
      price: this.product['price'],
      member: this.product['member']
    });
    console.log('saveProductForm-->', this.saveProductForm);
    this.displayDialog = true;
    this.getCustomerListByProductSeq(this.saveProductForm.get('productSeq').value);

    // this.saveProductForm.controls['mfd_date'].disable();
    this.disableMfdDate = this.saveProductForm.get('mfdDate').value !== null ? true : false;
    this.disableExpDate = this.saveProductForm.get('expDate').value !== null ? true : false;

    if (this.saveProductForm.get('mfdDate').value === null) {
      this.saveProductForm.get('mfdDate').setValue(new Date());
      const expDate = new Date(this.saveProductForm.get('mfdDate').value);
      const be_expDate = new Date(expDate.setMonth(expDate.getMonth() + 7));
      this.saveProductForm.get('expDate').setValue(be_expDate);
    }
  }

  getCustomerListByProductSeq(productSeq) {
    console.log('productSeq-->', productSeq);
    this.productService.getCustomerListByProductSeq(productSeq).subscribe(
      resultArray => {
        this.customers = resultArray;
        console.log('customers-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  onRowSelectCustomer(event) {
    console.log('onRowSelect-->', event);
  }

  setDataToEdit(data: Product): Product {
    const product = {};
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        // code here
        product[prop] = data[prop];
      }
    }
    return product;
  }

  getRiceVarities(lotId) {
    console.log('getRiceVarities-->', lotId);
    if (lotId) {
      this.addProductService.getProductByLotId(lotId).subscribe(data => {
        console.log('data-->', data[0]);
        if (data[0]) {
          console.log('พบข้อมูล');
          // this.msgs = [];
          this.saveProductForm
            .get('riceVarSeq')
            .setValue(data[0].rice_var_seq);
          this.saveProductForm
            .get('riceVarieties')
            .setValue(data[0].rice_varieties);
        } else {
          console.log('ไม่พบข้อมูล');
          this.saveProductForm.get('riceVarieties').setValue(null);
          // this.msgs = [];
          /* this.msgs.push({
            severity: 'error',
            summary: 'แจ้งเตือนจากระบบ',
            detail: 'ไม่พบข้อมูลจาก lot id นี้'
          }); */
          alert('ไม่พบข้อมูลจาก lot id นี้');
        }
      });
    } else {
      this.saveProductForm
        .get('riceVarSeq')
        .setValue(null);
      this.saveProductForm
        .get('riceVarieties')
        .setValue(null);
    }
  }

  showDialogToAdd() {
    this.newProduct = true;
    this.product = {};
    this.saveProductForm.reset();
    this.displayDialog = true;
    this.saveProductForm.get('mfdDate').setValue(new Date());
    const expDate = new Date();
    console.log('expDate-->', expDate);
    const be_expDate = new Date(expDate.setMonth(expDate.getMonth() + 6));
    console.log('be_expDate-->', be_expDate);
    this.saveProductForm.get('expDate').setValue(be_expDate);
  }

  cancel() {
    const key = this.saveProductForm.get('productSeq').value;
    console.log('key-->', key);
    this.productService.getProductById(key).subscribe(
      resultArray => {
        // this.members = resultArray;
        console.log('Result-->', resultArray);
        this.saveProductForm.patchValue({
          productSeq: this.product['product_seq'],
          lotId: this.product['lot_id'],
          riceVarieties: this.product['rice_var_name'],
          productQuantity: this.product['product_quantity'],
          mfdDate: this.product['mfd_date'] ? new Date(this.product['mfd_date']) : new Date(),
          expDate: this.product['exp_date'] ? new Date(this.product['exp_date']) : this.addMonth(7),
          riceVarSeq: this.product['rice_var_seq'],
          memberSeq: this.product['member_seq'],
          member: this.product['member']
        });

        this.getCustomerListByProductSeq(this.saveProductForm.get('productSeq').value);
      },
      error => console.log('Error :: ', error)
    );
  }

  save() {
    console.log('save-->', this.saveProductForm.value);
    const payload = {
      ...this.saveProductForm.value
    };

    if (this.newProduct) {
      console.log('payload-->', payload);
      this.productService.addProduct(payload).subscribe(
        data => {
          this.displayDialog = false;
          console.log('response-->', data);
          this.search();
          alert('บันทึกข้อมูลเรียบร้อย');
        },
        error => {
          console.error('Error adding data!');
          return Observable.throw(error);
        }
      );
    } else {
      if (this.validateFormField()) {
        console.log('payload-->', payload);
        this.productService.editProduct(payload).subscribe(
          data => {
            this.displayDialog = false;
            console.log('response-->', data);
            this.search();
            alert('บันทึกข้อมูลเรียบร้อย');
          },
          error => {
            console.error('Error editing data!');
            return Observable.throw(error);
          }
        );
      } else {
        console.log('message-->', this.message);
        alert(this.message.join('\n'));
      }
    }
  }

  delete(event) {
    if (confirm('ต้องการลบข้อมูลหรือไม่')) {
      console.log('delete-->', event);
      const key = event.product_seq;
      console.log('key-->', key);
      this.productService
        .deleteProduct(key)
        .pipe(
          tap(() => this.search()),
          finalize(() => alert('ลบข้อมูลเรียบร้อย'))
        )
        .subscribe(
          data => {
            this.displayDialog = false;
            console.log('response-->', data);
            // this.search();
            // alert('ลบข้อมูลเรียบร้อย');
            return true;
          },
          error => {
            console.error('Error deleting!');
            return Observable.throw(error);
          }
        );
    }
  }

  clear() {
    this.products = null;
  }

  validateFormField() {
    this.message = [];
    let i = 0;
    let valid = true;
    if (!this.saveProductForm.get('productQuantity').value) {
      this.message[i] = 'กรุณาระบุจำนวนกระสอบ'; i++; valid = false;
    }
    if (!this.saveProductForm.get('mfdDate').value) {
      this.message[i] = 'กรุณาระบุวันที่ผลิต'; i++; valid = false;
    }
    if (!this.saveProductForm.get('expDate').value) {
      this.message[i] = 'กรุณาระบุวันที่หมดอายุ'; i++; valid = false;
    }

    /* console.log('message-->', this.message);
    alert(this.message.join('\n')); */

    return valid;
  }

  selectMfdDate() {
    console.log('mfdDate-->', this.saveProductForm.get('mfdDate').value);
    // console.log('expDate-->', this.saveProductForm.get('expDate').value.getMonth() + 7);
    const expDate = new Date(this.saveProductForm.get('mfdDate').value);
    const be_expDate = new Date(expDate.setMonth(expDate.getMonth() + 7));
    // console.log('expDate-->', be_expDate.setMonth(be_expDate.getMonth() + 7));
    this.saveProductForm.get('expDate').setValue(be_expDate);
  }

  addMonth(month) {
    console.log('mfdDate-->', this.saveProductForm.get('mfdDate').value);
    const expDate = new Date(this.saveProductForm.get('mfdDate').value ? this.saveProductForm.get('mfdDate').value : new Date());
    const be_expDate = new Date(expDate.setMonth(expDate.getMonth() + month));
    return be_expDate;
    // this.saveProductForm.get('expDate').setValue(be_expDate);
  }

}
