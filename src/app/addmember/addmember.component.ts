declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { AddmemberService } from './services/addmember/addmember.service';
import { Member } from '@shared/models/member/member';
@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css'], 
  providers: [AddmemberService]
})
export class AddmemberComponent implements OnInit {
  imgPath = require('src/assets/images/rice.jpg');
  formData:Member
  constructor(
    private addmemberService : AddmemberService
  ) {}

  ngOnInit() {    
    this.formData = new Member()
  }

  onSubmitAddMember () {



    this.addmemberService.Add(this.formData).subscribe(resultString => {
      console.log(resultString)
    })
  }
}
