import {
  Component,
  OnInit,
  forwardRef,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '../../../node_modules/@angular/forms';
import { MemberService } from '../member/services/member/member.service';
import { Member } from '@shared/models/member/member';
import { AddProductComingService } from './services/add-product-coming/add-product-coming.service';
import { Observable } from '../../../node_modules/rxjs';
import { RiceService } from '../rice/services/rice/rice.service';
import { RiceVarieties } from '@shared/models/rice-varieties/rice-varieties';

@Component({
  selector: 'app-add-product-coming',
  templateUrl: './add-product-coming.component.html',
  styleUrls: ['./add-product-coming.component.css']
})
export class AddProductComingComponent implements OnInit {
  constructor(
    private memberService: MemberService,
    private riceService: RiceService,
    private addProductComingService: AddProductComingService
  ) {}

  addForm: FormGroup;
  lotIdGen: number;

  members: Member[];
  results: Member[];
  display: Member[];

  riceVarieties: RiceVarieties[];

  @Output()
  userSelected: any = new EventEmitter();

  ngOnInit() {
    this.initForm();
    this.genLotId();
    this.prepareLov();
  }

  initForm() {
    this.addForm = new FormGroup({
      lotId: new FormControl({ value: null }),
      date: new FormControl(),
      member: new FormControl(),
      licensePlace: new FormControl({ value: null, disabled: true }),
      riceVarieties: new FormControl(),
      timeIn: new FormControl(),
      timeOut: new FormControl(),
      remark: new FormControl()
    });
  }

  genLotId() {
    this.lotIdGen = Math.floor(new Date().getTime() / 1000);
    console.log('lotIdGen-->', Math.floor(this.lotIdGen));
    this.addForm.patchValue({
      lotId: this.lotIdGen
    });
  }

  prepareLov() {
    this.memberService.getMembers().subscribe(
      resultArray => {
        this.members = resultArray;
        this.results = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  search(event) {
    console.log('event-->', event);
    const condition = {
      keyword: event.query
    };
    this.memberService.getMemberByCondition(condition).subscribe(data => {
      console.log('data-->', data);
      // this.results = data.map(key => key.member_name);
      this.results = data;
      this.display = data.map(key => key.member_name);
    });
  }

  searchRiceVarieties(event) {
    console.log('event-->', event);
    const condition = {
      keyword: event.query
    };
    this.riceService.getRiceVarietiesByCondition(condition).subscribe(data => {
      console.log('data-->', data);
      this.riceVarieties = data;
      // this.display = data.map(key => key.member_name);
    });
  }

  save() {
    const payload = {
      ...this.addForm.value
    };

    console.log('payload-->', payload);
    this.addProductComingService.addProductComing(payload).subscribe(
      data => {
        alert('เพิ่มข้อมูลเรียบร้อย');
      },
      error => {
        console.error('Error adding data!');
        return Observable.throw(error);
      }
    );
  }

  cancle() {
    this.addForm.reset();
    this.genLotId();
  }

  onLovSelect(event) {
    console.log('event-->', event);
    // this.userSelected.emit(event);
    this.addForm.patchValue({
      licensePlace: event['member_license_place']
    });
  }

  onLovClear(event) {
    this.addForm.patchValue({
      licensePlace: null
    });
    this.addForm.get('member').setValue(null);
  }

  clearLov(lovName: string[]) {
    console.log('clearLov-->', lovName);
    lovName.forEach(namelov => {
      this.addForm.get(namelov).setValue(null);
    });
  }
}
