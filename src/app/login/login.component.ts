import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { AuthInfo } from '../AuthInfo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router, ) {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  
  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
    },
    error => {
        this.loading = false;
    });
  }
  ngOnInit() {
  }



}

