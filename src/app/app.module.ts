import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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
import { AddmemberComponent } from './addmember/addmember.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { AddproductcomingComponent } from './addproductcoming/addproductcoming.component';
import { NotificationComponent } from './notification/notification.component';
import { StatComponent } from './stat/stat.component';
import { AddriceComponent } from './addrice/addrice.component';
import { CalendarModule } from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';

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
    AddproductcomingComponent,
    NotificationComponent,
    StatComponent,
    AddriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
