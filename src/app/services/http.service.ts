import { environment } from '../../environments/environment';
import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class httpService {
  token: any;
  APP_URL = environment.APP_URL;
  constructor(public helper: HelperService, private http: HttpClient) { }

  postWithoutHeader(URL, data) {
    const response = this.http.post(this.APP_URL + URL, data);
    return response;
  }

  postWithHeader(URL, data, xAuthToken) {
    const response = this.http.post(this.APP_URL + URL, data, {
      headers: this.createAuthorizationHeader(xAuthToken)
    }).pipe(map(res => res));
    return response;
  }

  putWithHeader(URL, data, xAuthToken) {
    const response = this.http.put(this.APP_URL + URL, data, {
      headers: this.createAuthorizationHeader(xAuthToken)
    }).pipe(map(res => res));
    return response;
  }


  createAuthorizationHeader(token?) {
    const headerOptions: any = {};
    if (token) {
      headerOptions['authorization'] = token;
    }
    const headers = new HttpHeaders(headerOptions);
    return headers;
  }

  getWithHeader(URL, xAuthToken) {
    const response = this.http.get(this.APP_URL + URL, { headers: this.createAuthorizationHeader(xAuthToken) }).pipe(map(res => res));
    return response;
  }

  getWithHeaderExportFunctionality(URL, xAuthToken) {
    return new Promise((resolve, reject) => {
      let headerParams = {};
      headerParams = { headers: { authorization: xAuthToken }, responseType: 'text' };
      this.http.get(this.APP_URL + URL, headerParams).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  get(URL) {
    const response = this.http.get(this.APP_URL + URL).pipe(map(res => res));
    return response;
  }

  deleteWithHeader(URL, xAuthToken) {
    const response = this.http.delete(this.APP_URL + URL, { headers: this.createAuthorizationHeader(xAuthToken) }).pipe(map(res => res));
    return response;
  }
}
