declare function require(path: string);
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { Member } from '@shared/models/member/member';
import { MemberService } from './services/member/member.service';
import { HttpModule } from '../../../node_modules/@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { Observable } from '../../../node_modules/rxjs';
import { tap, finalize } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  providers: [MemberService]
})
export class MemberComponent implements OnInit {
  imgPath = require('src/assets/images/banner.jpg');

  constructor(
    private formBuilder: FormBuilder,
    // @Inject(forwardRef(() => MemberService)) memberService
    private memberService: MemberService // @Inject(MemberService) public memberService: MemberService
  ) { }

  memberForm: FormGroup;
  saveMemberForm: FormGroup;

  condition = {
    keyword: ''
  };

  display: Boolean;
  displayDialog: boolean;
  member: any;
  selectedMember: Member;
  newMember: boolean;
  members: Member[];
  cols: any[];
  message = [];

  ngOnInit() {
    this.initForm();

    this.display = true;

    this.cols = [
      { field: 'member_id', header: 'รหัสสมาชิก' },
      { field: 'member_name', header: 'ชื่อ - นามสกุล' },
      { field: 'telephone', header: 'เบอร์โทรศัพท์' },
      { field: 'address', header: 'ที่อยู่' },
      { field: 'member_license_place', header: 'ทะเบียนรถ' }
    ];

    this.searchMember();
  }

  initForm() {
    this.memberForm = this.formBuilder.group({
      keyword: [null]
    });

    this.saveMemberForm = this.formBuilder.group({
      memberSeq: [null],
      memberId: [null],
      memberFname: [null],
      memberLname: [null],
      address: [null],
      telephone: [null],
      memberLicensePlace: [null]
    });
  }

  searchMember() {
    this.memberService.getMemberByCondition(this.condition).subscribe(
      resultArray => {
        this.members = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  search() {
    console.log('payload-->', this.memberForm.get('keyword').value);

    const payload = {
      keyword: this.memberForm.get('keyword').value
    };

    this.memberService.getMemberByCondition(payload).subscribe(
      resultArray => {
        this.members = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  showDialogToAdd() {
    this.newMember = true;
    this.member = {};
    this.saveMemberForm.reset();
    this.displayDialog = true;
    this.getMaxMemberId();
  }

  getMaxMemberId() {
    this.memberService.getMaxMemberId().subscribe(
      resultArray => {
        console.log('Result-->', resultArray);
        this.saveMemberForm.patchValue({
          memberId: resultArray[0]['member_id']
        });
      },
      error => console.log('Error :: ', error)
    );
  }

  /* save() {
    const members = [...this.members];
    if (this.newMember) {
      members.push(this.member);
    } else {
      members[this.members.indexOf(this.selectedMember)] = this.member;
    }

    this.members = members;
    this.member = null;
    this.displayDialog = false;
  } */

  save() {
    console.log('save-->', this.saveMemberForm.value);
    const payload = {
      ...this.saveMemberForm.value
    };

    if (this.newMember) {
      if (this.validateFormField()) {
        console.log('payload-->', payload);
        this.memberService.addMember(payload).subscribe(
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
        this.memberService.editMember(payload).subscribe(
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

  /* delete() {
    const index = this.members.indexOf(this.selectedMember);
    this.members = this.members.filter((val, i) => i !== index);
    this.member = null;
    this.displayDialog = false;
  } */

  delete(event) {
    if (confirm('ต้องการลบข้อมูลหรือไม่')) {
      console.log('delete-->', event);
      const key = event.member_seq;
      console.log('key-->', key);
      this.memberService
        .deleteMember(key)
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
            console.error('Error deleting deleteMember!');
            return Observable.throw(error);
          }
        );
    }
  }

  cancel() {
    const key = this.saveMemberForm.get('memberSeq').value;
    console.log('key-->', key);
    this.memberService.getMemberById(key).subscribe(
      resultArray => {
        // this.members = resultArray;
        console.log('Result-->', resultArray);
        this.saveMemberForm.patchValue({
          memberSeq: resultArray[0]['member_seq'],
          memberId: resultArray[0]['member_id'],
          memberFname: resultArray[0]['member_fname'],
          memberLname: resultArray[0]['member_lname'],
          memberLicensePlace: resultArray[0]['member_license_place'],
          address: resultArray[0]['address'],
          telephone: resultArray[0]['telephone']
        });
      },
      error => console.log('Error :: ', error)
    );
  }

  /* onRowSelect(event) {
    this.newMember = false;
    this.member = this.cloneCar(event.data);
    this.displayDialog = true;
  } */

  onRowSelect(event) {
    console.log('onRowSelect-->', event);
    this.newMember = false;
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
    this.displayDialog = true;
  }

  setDataToEdit(data: Member): Member {
    const member = {};
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        // code here
        member[prop] = data[prop];
      }
    }
    return member;
  }

  cloneCar(c: Member): Member {
    const member = null;
    // tslint:disable-next-line:forin
    for (const prop in c) {
      member[prop] = c[prop];
    }
    return member;
  }

  validateFormField() {
    this.message = [];
    let i = 0;
    let valid = true;
    if (!this.saveMemberForm.get('memberId').value) {
      this.message[i] = 'กรุณาระบุรหัส'; i++; valid = false;
    }
    if (!this.saveMemberForm.get('memberFname').value) {
      this.message[i] = 'กรุณาระบุชื่อ'; i++; valid = false;
    }
    if (!this.saveMemberForm.get('memberLname').value) {
      this.message[i] = 'กรุณาระบุนามสกุล'; i++; valid = false;
    }
    if (!this.saveMemberForm.get('address').value) {
      this.message[i] = 'กรุณาระบุที่อยู่'; i++; valid = false;
    }
    if (!this.saveMemberForm.get('telephone').value) {
      this.message[i] = 'กรุณาระบุโทรศัพท์'; i++; valid = false;
    }
    if (!this.saveMemberForm.get('memberLicensePlace').value) {
      this.message[i] = 'กรุณาระบุทะเบียนรถ'; i++; valid = false;
    }

    return valid;
  }
}
