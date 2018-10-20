declare function require(path: string);
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { Member } from '@shared/models/member/member';
import { MemberService } from './services/member/member.service';
import { HttpModule } from '../../../node_modules/@angular/http';
import { DatabaseConfig } from '@config/database/database.config';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  providers: [MemberService]
})
export class MemberComponent implements OnInit {
  imgPath = require('src/assets/images/banner.jpg');

  constructor(
    // @Inject(forwardRef(() => MemberService)) memberService
    private memberService: MemberService // @Inject(MemberService) public memberService: MemberService
  ) {}

  condition ={
    keyword:''
  } 
  display: Boolean;
  displayDialog: boolean;
  member: Member;
  selectedMember: Member;
  newMember: boolean;
  members: Member[];
  cols: any[];
  
  ngOnInit() {
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
  searchMember() {

this.memberService.getMemberByCondition(this.condition).subscribe(
      resultArray => {
        this.members = resultArray;
        console.log('Result-->', resultArray);
      },
      error => console.log('Error :: ', error)
    );
  }

  showDialogToAdd() {
    this.newMember = true;
    this.member = null;
    this.displayDialog = true;
  }

  save() {
    const members = [...this.members];
    if (this.newMember) {
      members.push(this.member);
    } else {
      members[this.members.indexOf(this.selectedMember)] = this.member;
    }

    this.members = members;
    this.member = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.members.indexOf(this.selectedMember);
    this.members = this.members.filter((val, i) => i !== index);
    this.member = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newMember = false;
    this.member = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: Member): Member {
    const member = null;
    // tslint:disable-next-line:forin
    for (const prop in c) {
      member[prop] = c[prop];
    }
    return member;
  }
}
