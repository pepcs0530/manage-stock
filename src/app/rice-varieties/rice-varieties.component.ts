import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { RiceVarieties } from '@shared/models/rice-varieties/rice-varieties';
import { RiceService } from '../rice/services/rice/rice.service';
import { RiceVarietiesService } from './services/rice-varieties/rice-varieties.service';
import { Observable } from '../../../node_modules/rxjs';
import { tap, finalize } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-rice-varieties',
  templateUrl: './rice-varieties.component.html',
  styleUrls: ['./rice-varieties.component.css']
})
export class RiceVarietiesComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private riceService: RiceService,
    private riceVarietiesService: RiceVarietiesService
  ) { }

  decimalWithDigits: RegExp = /^[0-9\.]+$/;

  riceVarietieForm: FormGroup;
  riceVarieties: RiceVarieties[];

  riceVarietie = null;
  selectedRiceVarietie: RiceVarieties;
  newRiceVarietie: boolean;

  displayDialog: boolean;

  saveRiceVarietieForm: FormGroup;
  message = [];

  ngOnInit() {
    this.initForm();
    this.search();
  }

  initForm() {
    this.riceVarietieForm = this.formBuilder.group({
      keyword: [null]
    });

    this.saveRiceVarietieForm = this.formBuilder.group({
      riceVarSeq: [null],
      riceVarId: [null],
      riceVarName: [null],
      price: [null]
    });
  }

  showDialogToAdd() {
    this.newRiceVarietie = true;
    this.riceVarietie = {};
    this.saveRiceVarietieForm.reset();
    this.displayDialog = true;
    this.getMaxRiceVarietiesId();
  }

  search() {
    console.log('payload-->', this.riceVarietieForm.get('keyword').value);

    const payload = {
      keyword: this.riceVarietieForm.get('keyword').value
    };

    this.riceService.getRiceVarietiesByCondition(payload).subscribe(
      resultArray => {
        this.riceVarieties = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  clear() {
    this.riceVarieties = null;
  }

  onRowSelect(event) {
    console.log('onRowSelect-->', event);
    this.newRiceVarietie = false;
    this.riceVarietie = this.setDataToEdit(event.data);
    console.log('setDataToEdit-->', this.riceVarietie);
    this.saveRiceVarietieForm.patchValue({
      riceVarSeq: this.riceVarietie['rice_var_seq'],
      riceVarId: this.riceVarietie['rice_var_id'],
      riceVarName: this.riceVarietie['rice_var_name'],
      price: this.riceVarietie['price']
    });
    console.log('saveRiceVarietieForm-->', this.saveRiceVarietieForm);
    this.displayDialog = true;
  }

  setDataToEdit(data: RiceVarieties): RiceVarieties {
    const riceVarietie = {};
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        // code here
        riceVarietie[prop] = data[prop];
      }
    }
    return riceVarietie;
  }

  /* delete() {
    if (confirm('ต้องการลบข้อมูลหรือไม่')) {
      console.log('delete-->', this.saveRiceVarietieForm);
      const key = this.saveRiceVarietieForm.get('riceVarSeq').value;
      this.riceVarietiesService.deleteRiceVarietie(key).subscribe(
        data => {
          this.displayDialog = false;
          console.log('response-->', data);
          this.search();
          alert('ลบข้อมูลเรียบร้อย');
          return true;
        },
        error => {
          console.error('Error deleting deleteRiceVarietie!');
          return Observable.throw(error);
        }
      );
    }
  } */

  delete(event) {
    if (confirm('ต้องการลบข้อมูลหรือไม่')) {
      console.log('delete-->', event);
      const key = event.rice_var_seq;
      console.log('key-->', key);
      this.riceVarietiesService
        .deleteRiceVarietie(key)
        .pipe(
          tap(() => this.search()),
          finalize(() => alert('ลบข้อมูลเรียบร้อย'))
        )
        .subscribe(
          data => {
            this.displayDialog = false;
            console.log('response-->', data);
            return true;
          },
          error => {
            console.error('error-->', error);
            return Observable.throw(error);
          }
        );
    }
  }

  save() {
    console.log('save-->', this.saveRiceVarietieForm.value);
    const payload = {
      ...this.saveRiceVarietieForm.value
    };

    if (this.newRiceVarietie) {
      if (this.validateFormField()) {
        console.log('payload-->', payload);
        this.riceVarietiesService.addRiceVarieties(payload).subscribe(
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
        console.log('message-->', this.message);
        alert(this.message.join('\n'));
      }
    } else {
      if (this.validateFormField()) {
        console.log('payload-->', payload);
        this.riceVarietiesService.editRiceVarieties(payload).subscribe(
          data => {
            this.displayDialog = false;
            console.log('response-->', data);
            this.search();
            alert('แก้ไขข้อมูลเรียบร้อย');
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

  cancel() {
    const key = this.saveRiceVarietieForm.get('riceVarSeq').value;
    console.log('key-->', key);
    this.riceVarietiesService.getRiceVarietieById(key).subscribe(
      resultArray => {
        // this.members = resultArray;
        console.log('Result-->', resultArray);
        this.saveRiceVarietieForm.patchValue({
          riceVarSeq: resultArray[0]['rice_var_seq'],
          riceVarId: resultArray[0]['rice_var_id'],
          riceVarName: resultArray[0]['rice_var_name'],
          price: resultArray[0]['price']
        });
      },
      error => console.log('Error-->', error)
    );
  }

  validateFormField() {
    this.message = [];
    let i = 0;
    let valid = true;
    if (!this.saveRiceVarietieForm.get('riceVarId').value) {
      this.message[i] = 'กรุณาระบุรหัส'; i++; valid = false;
    }
    if (!this.saveRiceVarietieForm.get('riceVarName').value) {
      this.message[i] = 'กรุณาระบุชื่อสายพันธุ์'; i++; valid = false;
    }
    if (!this.saveRiceVarietieForm.get('price').value) {
      this.message[i] = 'กรุณาระบุราคา'; i++; valid = false;
    }

    /* console.log('message-->', this.message);
    alert(this.message.join('\n')); */

    return valid;
  }

  getMaxRiceVarietiesId() {
    this.riceVarietiesService.getMaxRiceVarietiesId().subscribe(
      resultArray => {
        console.log('Result-->', resultArray);
        this.saveRiceVarietieForm.patchValue({
          riceVarId: resultArray[0]['riceVarId']
        });
      },
      error => console.log('Error :: ', error)
    );
  }
}
