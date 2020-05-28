import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private httpClient: HttpClient) { }

  private httpOptions = { headers: new HttpHeaders({ 'content-type': 'application/json' }) };

  private httpOptionsForLoginLogout = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Authorization': 'Bearer d8qpefnss76os4ghmffvdko55uhm5bc70542o1fvs6jj0gic11612',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Cookie': 'JSESSIONID=EED9A84B5C784C74B7BDF545FB4CF2B9',
      'Host': 'http://95.216.174.93:8089',
      'User-Agent': 'PostmanRuntime/7.16.3',
      'cache-control': 'no-cache'
    })
  };
  private apiBaseUrl = environment.apiBaseUrl; // ("http://95.216.174.93:8089/eddytech/user/");
  private loginUrl = environment.apiBaseUrl + "user/login";
  private logoutUrl = environment.apiBaseUrl + "user/logout";

  getApiBaseUrl() {
    return environment.apiBaseUrl;
  }
  getLoginUrl() {
    return this.loginUrl;
  }
  getLogoutUrl() {
    return this.logoutUrl;
  }
  getHttpOptionsForLoginLogout() {
    return this.httpOptionsForLoginLogout;
  }

  // Methods
  httpGet(url, params?): Observable<any> {
    return this.httpClient.get(url, params);
  }
  httpPost(url, data, options): Observable<any> {
    return this.httpClient.post(url, data, options);
  }
  httpPut(url, data, options): Observable<any> {
    return this.httpClient.put(url, data, options);
  }
  httpDelete(url, options): Observable<any> {
    return this.httpClient.delete(url, options);
  }
}
