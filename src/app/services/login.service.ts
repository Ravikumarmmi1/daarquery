import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Encription } from '../utils/encription';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private Router: Router,
    private authService: AuthService,
  ) {
  }

  crypt = inject(Encription);

  public navigateToLogin() {
    if(localStorage.getItem('_userEncDetails')){
      this.authService.login();
      return;
    }else{
      let paramsString = window.location.href.split('?')[1];
      /* if(window.location.href.includes("#")) {
        paramsString = window.location.href.split('#')[1];
      } */
      if (paramsString) {
        const searchParams = new URLSearchParams(paramsString);
        if (searchParams.get('code')) {
          this.login(searchParams.get('code') as any);
        }
      } else {
        // console.log(environment)
        const url: string =environment.outpost+'response_type=code&client_id='+environment.client_id+'&redirect_uri='+environment.baseurl;
        /* console.log(url); */
        window.location.href = url;
      
      }
    }
  }

  public login(authCode: string) {
    const params = new HttpParams()
      .set('authCode', authCode)
      .set('redirectURI', environment.baseurl);
    this.http.post(environment.domain + '/oneLogin', params)
    .pipe(catchError(err => {  
        console.log('Server is not running!.', err);
        this.logout();
        return (err);
      })
    )
    .subscribe((response: any) => {
      try {
        /* console.log(response); */
        if (response['status'] == 200) {
        
          if (response != null &&response['data'] != null &&response['data'].jtoken) {

            localStorage.setItem('_userName', response['data'].name);
            localStorage.setItem('_profilePicture', response['data'].profilePicture);
            localStorage.setItem('_jtoken', response['data'].jtoken);
            localStorage.setItem('_fa',JSON.stringify(response['data'].feature_access));
            let enc: any = this.crypt.encryptUsingAES256(JSON.stringify(response['data']));
            localStorage.setItem('_userEncDetails', enc);
            this.authService.login();
            return;
          }
        } else if (response['status'] === 401) {
          console.log(response['errors'][0]['errorMessage']);
          this.logout();
        } else {
          console.log(response['errors'][0]['errorMessage']);
          console.log('logout1');
          this.logout();
        }
      } catch (error) {
        console.log(error);
        this.logout();
      }
    });
  }
  
  public logout() {
    this.authService.logout();
  }


}
