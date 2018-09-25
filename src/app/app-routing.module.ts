import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddproductcomingComponent } from './addproductcoming/addproductcoming.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { AddriceComponent } from './addrice/addrice.component';
import { StatComponent } from './stat/stat.component';

const routes: Routes = [
  { path: '', redirectTo: '/member', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'member', component: MemberComponent },
  { path: 'addmember', component: AddmemberComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'addproductcoming', component: AddproductcomingComponent },
  { path: 'addrice', component: AddriceComponent },
  { path: 'searchproduct', component: SearchproductComponent },
  { path: 'stat', component: StatComponent },
  {
    // default path
    path: '**',
    component: MemberComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
