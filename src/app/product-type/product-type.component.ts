import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { ProductService } from '../product/services/product/product.service';
import { ProductType } from '@shared/models/product-type/product-type';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  productTypeForm: FormGroup;
  productTypes: any[];
  selectedProductType: ProductType;

  saveProductTypeForm: FormGroup;
  productType: any;
  newProductType: boolean;
  displayDialog: boolean;
  message = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productTypeForm = this.formBuilder.group({
      productTypeName: [null]
    });

    this.saveProductTypeForm = this.formBuilder.group({
      productTypeName: [null]
    });
  }

  search() { }

  delete(event) {
    if (confirm('ต้องการลบข้อมูลหรือไม่')) {
      console.log('delete-->', event);
      /* const key = event.product_seq;
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
        ); */
    }
  }

  clear() { }

  onRowSelect(event) {
    console.log('onRowSelect-->', event);
    /* this.newProduct = false;
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
      member: this.product['member']
    }); */
    console.log('saveProductTypeForm-->', this.saveProductTypeForm);
    this.displayDialog = true;
  }

  showDialogToAdd() {
    this.newProductType = true;
    this.productType = {};
    this.saveProductTypeForm.reset();
    this.displayDialog = true;
    /* this.saveProductForm.get('mfdDate').setValue(new Date());
    const expDate = new Date();
    console.log('expDate-->', expDate);
    const be_expDate = new Date(expDate.setMonth(expDate.getMonth() + 6));
    console.log('be_expDate-->', be_expDate);
    this.saveProductForm.get('expDate').setValue(be_expDate); */
  }

  save() { }

  cancel() { }


}
