import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';
import { AuthInfo } from './AuthInfo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);
    params.set('scope', 'administration');
    params.set('client_id', 'infoarchive.custom');
    const httpHeaderOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic aW5mb2FyY2hpdmUuY3VzdG9tOm15c2VjcmV0',
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<AuthInfo>
    ('/login', params.toString(), httpHeaderOptions)
    .map(auth => {
         localStorage.setItem('currentUser', JSON.stringify(auth));
  });   
  }

  logout() {
    localStorage.removeItem('currentUser');
}

  

}
