import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadService } from './file-upload.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthService} from './auth.service';
import { AppRouterModule } from './/app-router.module';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { RestService } from './rest.service';
@NgModule({

  exports: [],

  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule
    
],


  providers: [AuthService,
    RestService,
    AuthGuardGuard,FileUploadService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
