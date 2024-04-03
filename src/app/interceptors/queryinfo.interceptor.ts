import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { QuerybuilderService } from '../services/queryBuilder/querybuilder.service';
import { inject } from '@angular/core';
import { Observable } from "rxjs";
import { tap, timeout } from "rxjs/operators";
import { LoaderService } from '../services/loader/loader.service';
import { environment } from '../../environments/environment';
export const queryinfoInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const Querybuilderservice = inject(QuerybuilderService);
 
  if(Querybuilderservice.isNotAvailable){
    
    const token=localStorage.getItem('_jtoken');
    req =  req.clone({
      headers:req.headers.set('Authorization',`Bearer ${token}`)
      
      /* .set('X-Request-Timeout','300000'), */
      /* setHeaders: { 'X-Request-Timeout': `${this.defaultTimeout}` } */
    })
    
  }
  /* return next(req); */
  const loaderService = inject(LoaderService);
  return next(req).pipe(
    
    timeout(environment.apiResponseTimeout),
    tap({
      next: () => {
        loaderService.show();
        //  console.log('Request sent') 
      },
      error: () => {
        loaderService.hide();
        // console.log('Request faild')
      },
      complete: () => {
        loaderService.hide();
      //  console.log('Request completed') 
      },
    })
  );
};
