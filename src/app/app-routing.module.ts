import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CashierComponent} from './cashier/cashier.component'
import { MemberComponent } from './member/member.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddproductcomingComponent } from './addproductcoming/addproductcoming.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { AddriceComponent } from './addrice/addrice.component';
import { RiceComponent} from './rice/rice.component'
import { StatComponent } from './stat/stat.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: '', redirectTo: '/member', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cashier',component:CashierComponent},
  { path: 'member', component: MemberComponent },
  { path: 'addmember', component: AddmemberComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'addproductcoming', component: AddproductcomingComponent },
  { path: 'addrice', component: AddriceComponent },
  { path: 'rice', component: RiceComponent},
  { path: 'searchproduct', component: SearchproductComponent },
  { path: 'stat', component: StatComponent },
  { path: 'notification', component: NotificationComponent },
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
