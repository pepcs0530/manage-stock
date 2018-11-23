import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { dateToStrYYYYMMDD } from '@shared/utils/date-to-str-yyyymmdd';
import { ProductService } from './services/product/product.service';
import { Product } from '@shared/models/product/product';
import { AddProductService } from '../add-product/services/add-product/add-product.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private addProductService: AddProductService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      // keyword: [null]
      productId: [null],
      productName: [null],
      memberName: [null],
      riceVarieties: [null],
      mfdDate: [null],
      expDate: [null]
    });

    this.saveProductForm = this.formBuilder.group({
      lotId: [null],
      riceVarieties: [null],
      productQuantity: [null],
      mfdDate: [null],
      expDate: [null]
    });

    /* this.saveProductForm.get('mfdDate').setValue(new Date());
    this.saveProductForm.get('expDate').setValue(new Date()); */
  }

  search() {
    console.log('productForm-->', this.productForm.value);
    console.log('mfdDate-->', dateToStrYYYYMMDD(this.productForm.get('mfdDate').value));
    console.log('expDate-->', dateToStrYYYYMMDD(this.productForm.get('expDate').value));

    const payload = {
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
    /* this.newMember = false;
    this.member = this.setDataToEdit(event.data);
    console.log('setDataToEdit-->', this.member);
    this.saveMemberForm.patchValue({
      memberSeq: this.member['member_seq'],
      memberId: this.member['member_id'],
      memberFname: this.member['member_fname'],
      memberLname: this.member['member_lname'],
      memberLicensePlace: this.member['member_license_place'],
      address: this.member['address'],
      telephone: this.member['telephone']
    });
    console.log('saveMemberForm-->', this.saveMemberForm);
    this.displayDialog = true; */
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
        console.log('พบข้อมูล');
        // this.msgs = [];
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
  }

  showDialogToAdd() {
    this.newProduct = true;
    this.product = {};
    this.saveProductForm.reset();
    this.displayDialog = true;
    this.saveProductForm.get('mfdDate').setValue(new Date());
    this.saveProductForm.get('expDate').setValue(new Date());
  }

  cancel() {

  }

  save() {

  }

  delete(event) {

  }

}
