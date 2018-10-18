import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MemberComponent } from './member/member.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { AddmemberComponent } from './addmember/addmember.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { NotificationComponent } from './notification/notification.component';
import { StatComponent } from './stat/stat.component';
import { AddriceComponent } from './addrice/addrice.component';
import { RiceComponent } from './rice/rice.component';
import { RiceListComponent } from './rice/rice-list/rice-list.component';
import { AddRiceComponent } from './rice/add-rice/add-rice.component';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { SpinnerModule } from 'primeng/spinner';
import { CashierComponent } from './cashier/cashier.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { AlertExpDateComponent } from './alert-exp-date/alert-exp-date.component';
import { DialogModule } from 'primeng/dialog';
import { MyDatePickerModule } from 'mydatepicker';
import { MemberFormComponent } from './member/components/member-form/member-form.component';
import { MemberService } from './member/services/member/member.service';
import {
  Http,
  ConnectionBackend,
  HttpModule
} from '../../node_modules/@angular/http';
import { DatabaseConfig } from '@config/database/database.config';
import { AddProductComingComponent } from './add-product-coming/add-product-coming.component';
import { AddProductComingFormComponent } from './add-product-coming/components/add-product-coming-form/add-product-coming-form.component';
import { AddProductComingService } from './add-product-coming/services/add-product-coming/add-product-coming.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    // DashboardComponent,
    NavbarComponent,
    MemberComponent,
    AddmemberComponent,
    AddproductComponent,
    SearchproductComponent,
    NotificationComponent,
    StatComponent,
    AddriceComponent,
    RiceComponent,
    RiceListComponent,
    AddRiceComponent,
    CashierComponent,
    AlertExpDateComponent,
    MemberFormComponent,
    AddProductComingComponent,
    AddProductComingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    ToolbarModule,
    CalendarModule,
    ChartModule,
    SpinnerModule,
    PanelModule,
    CardModule,
    TableModule,
    DialogModule,
    MyDatePickerModule,
    HttpModule
  ],
  exports: [],
  providers: [MemberService, AddProductComingService, DatabaseConfig],
  bootstrap: [AppComponent]
})
export class AppModule {}
