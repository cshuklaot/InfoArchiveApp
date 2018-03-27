import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private authService:AuthService ) {

  }
  login() {
    let auth=this.authService.login(this.model.username, this.model.password);
    console.log(JSON.stringify(this.authService.auth));
  }
  ngOnInit() {

  }



}

