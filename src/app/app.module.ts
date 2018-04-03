import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule }                     from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthService} from './auth.service';
import { AppRouterModule } from './/app-router.module';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { RestService } from './rest.service';
import { WidgetComponent } from './dashboard/widget/widget.component';
@NgModule({

  exports: [],

  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule,
    ReactiveFormsModule
],


  providers: [AuthService,
    RestService,
    AuthGuardGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
