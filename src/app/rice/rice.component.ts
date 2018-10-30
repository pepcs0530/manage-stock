import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { RiceService } from './services/rice/rice.service';
import { RiceVarieties } from '@shared/models/rice-varieties/rice-varieties';

@Component({
  selector: 'app-rice',
  templateUrl: './rice.component.html',
  styleUrls: ['./rice.component.css']
})
export class RiceComponent implements OnInit {
  searchRiceForm: FormGroup;
  riceVarieties: RiceVarieties[];

  constructor(
    private formBuilder: FormBuilder,
    private riceService: RiceService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.searchRiceForm = this.formBuilder.group({
      keyword: [null]
    });
  }

  search(value) {
    console.log('payload-->', this.searchRiceForm.get('keyword').value);

    const payload = {
      keyword: this.searchRiceForm.get('keyword').value
    };

    this.riceService.getRiceVarietiesByCondition(payload).subscribe(
      resultArray => {
        this.riceVarieties = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }
}
