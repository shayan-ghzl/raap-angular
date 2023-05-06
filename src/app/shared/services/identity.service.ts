import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { catchError, of, take, tap, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  mobileNumber = '';
  verificationType = 1;
  expireDateTime!: Date;

  constructor(
    private http: HttpClient,
  ) {
  }

  verificationStartChallange(username: string, forceByCode = false) {
    return this.http.get<any>(environment.apiUrl + 'Users/VerificationStartChallange', { params: new HttpParams().append('username', username).append('forceByCode', forceByCode) }).pipe(
      tap((value) => {
        console.log(value);
        this.mobileNumber = value.data.id;
        this.verificationType = value.data.verificationType;
      }),
      timeout(15000),
    );
  }

  confirm(code: string) {
    return this.http.post<any>(environment.apiUrl + 'Users/Confirm', {
      "id": this.mobileNumber,
      "verificationCode": code,
      "verificationType": this.verificationType,
      "ipAddress": "",
      "expireDateTime": new Date(),
      "message": ""
    }).pipe(
      take(1),
      tap((value) => { console.log(value, 'tap') }),
      timeout(15000),

    );
  }

  loginByPassword(password: string) {
    return this.http.post<any>(environment.apiUrl + 'Users/LoginByPassword', {
      'username': this.mobileNumber,
      'password': password
    }).pipe(
      tap(console.log)
    );
  }

  getCurrentUser() {
    let temp = Cookies.get('at') ;
    if (temp) {
      return this.http.get<any>(environment.apiUrl + 'Users/GetCurrentUser',
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${temp}`
          })
        }
      ).pipe(
        take(1),
        timeout(15000),
        catchError(err => {
          console.log(err, 'catchError');
          return of({ issuccess: false });
        })
      );
    }
    return of({ issuccess: false });
  }

}


class DomHandler {

  private static browser: any;

  public static getUserAgent(): string {
    return navigator.userAgent;
  }

  public static isIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return true;
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return true;
    }

    // other browser
    return false;
  }

  public static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
  }

  public static isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  }

  public static isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }

  public static getBrowser() {
    if (!this.browser) {
      let matched = this.resolveUserAgent();
      this.browser = {};

      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser['version'] = matched.version;
      }

      if (this.browser['chrome']) {
        this.browser['webkit'] = true;
      } else if (this.browser['webkit']) {
        this.browser['safari'] = true;
      }
    }

    return this.browser;
  }

  public static resolveUserAgent() {
    let ua = navigator.userAgent.toLowerCase();
    let match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
      [];

    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  }

}