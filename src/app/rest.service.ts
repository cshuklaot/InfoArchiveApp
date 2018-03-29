import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';
import { AuthInfo } from './AuthInfo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class RestService {
 private headers = new HttpHeaders();
  
  constructor(private http: HttpClient,
    private auth: AuthService) {
    console.log('c called');
    this.setHeader();
  }
  setHeader() {
    this.headers = this.headers.set('Authorization', this.getServiceAuthString());
  }
  getServiceAuthString() {
    let auth: AuthInfo = JSON.parse(localStorage.getItem('currentUser'));
    return auth.token_type + ' ' + auth.access_token;
  }
  dopost(url: string, payload: any) {
    return this.execute(this.http.post(url, payload, { headers: this.headers }),url);
  }
  doGet(url: string) {
    return this.execute(this.http.get(url, { headers: this.headers }),url);
  }

  execute(observable:Observable<any>,url:string='')
  {
   return observable.pipe(
      tap(_obj => console.log(`request to url=${url} was successful`)),
      catchError(this.handleError(`request to url=${url} was failed`))
    );
  }
  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
