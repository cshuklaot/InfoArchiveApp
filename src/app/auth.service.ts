import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';
import { AuthInfo } from './AuthInfo';
@Injectable()
export class AuthService {
  
  public auth: AuthInfo;
  
  constructor(private http: HttpClient) { }  
  
  login(username: string, password: string) {
    console.log('15' + JSON.stringify(this.auth));
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
    this.http.post<any>('/login', params.toString(), httpHeaderOptions).
    subscribe(
      auth=> this.auth = auth
       );
    return this.auth;
  }
}
