import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CashierComponent } from './cashier/cashier.component';
import { MemberComponent } from './member/member.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { RiceComponent } from './rice/rice.component';
import { StatComponent } from './stat/stat.component';
import { NotificationComponent } from './notification/notification.component';
import { AddProductComingComponent } from './add-product-coming/add-product-coming.component';
import { AddRiceVarietiesComponent } from './add-rice-varieties/add-rice-varieties.component';

const routes: Routes = [
  { path: '', redirectTo: '/addProductComing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cashier', component: CashierComponent },
  { path: 'member', component: MemberComponent },
  { path: 'addmember', component: AddmemberComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'addrice', component: AddRiceVarietiesComponent },
  { path: 'rice', component: RiceComponent },
  { path: 'searchproduct', component: SearchproductComponent },
  { path: 'stat', component: StatComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'addProductComing', component: AddProductComingComponent },
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
