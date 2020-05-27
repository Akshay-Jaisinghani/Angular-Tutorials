import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {headers: new HttpHeaders({'content-type':'application/json'})};
  private apiBaseUrl = environment.apiBaseUrl; // ("http://95.216.174.93:8089/eddytech/user/");
  private loginLogoutUrl = environment.apiBaseUrl + "login";

  getLoginLogoutUrl() {
    return this.loginLogoutUrl;
  }

  // Methods
  httpGet(url, params?):Observable<any> {
    return this.httpClient.get(url, params);
  }
  httpPost(url, data, options):Observable<any> {
    return this.httpClient.post(url, data, options);
  }
  httpPut(url, data, options):Observable<any> {
    return this.httpClient.put(url, data, options);
  }
  httpDelete(url, options):Observable<any> {
    return this.httpClient.delete(url, options);
  }
}
