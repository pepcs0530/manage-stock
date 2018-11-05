import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { RiceVarieties } from '@shared/models/rice-varieties/rice-varieties';
import { RiceService } from '../rice/services/rice/rice.service';
import { RiceVarietiesService } from './services/rice-varieties/rice-varieties.service';
import { Observable } from '../../../node_modules/rxjs';

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
  ) {}

  decimalWithDigits: RegExp = /^[0-9\.]+$/;

  riceVarietieForm: FormGroup;
  riceVarieties: RiceVarieties[];

  riceVarietie = null;
  selectedRiceVarietie: RiceVarieties;
  newRiceVarietie: boolean;

  displayDialog: boolean;

  saveRiceVarietieForm: FormGroup;

  ngOnInit() {
    this.initForm();
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

  delete() {
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
  }

  save() {
    console.log('save-->', this.saveRiceVarietieForm.value);
    const payload = {
      ...this.saveRiceVarietieForm.value
    };

    if (this.newRiceVarietie) {
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
    }
  }
}
