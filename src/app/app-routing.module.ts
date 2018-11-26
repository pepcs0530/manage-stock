import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CashierComponent } from './cashier/cashier.component';
import { MemberComponent } from './member/member.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { RiceComponent } from './rice/rice.component';
import { StatComponent } from './stat/stat.component';
import { NotificationComponent } from './notification/notification.component';
import { AddProductComingComponent } from './add-product-coming/add-product-coming.component';
import { AddRiceVarietiesComponent } from './add-rice-varieties/add-rice-varieties.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RiceVarietiesComponent } from './rice-varieties/rice-varieties.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: '/stat', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cashier', component: CashierComponent },
  { path: 'member', component: MemberComponent },
  { path: 'addmember', component: AddmemberComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'addrice', component: AddRiceVarietiesComponent },
  { path: 'rice', component: RiceComponent },
  { path: 'searchproduct', component: SearchproductComponent },
  { path: 'stat', component: StatComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'addProductComing', component: AddProductComingComponent },
  { path: 'riceVarieties', component: RiceVarietiesComponent },
  { path: 'product', component: ProductComponent },
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
export class AppRoutingModule { }
