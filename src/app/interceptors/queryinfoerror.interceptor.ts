import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
// import { LoaderService } from '../services/loader/loader.service';

export const queryinfoerrorInterceptor: HttpInterceptorFn = (req, next) => {
  // const loaderService = inject(LoaderService);
  return next(req).pipe(
    catchError((error)=>{
       if(["Unknown Error"].includes(error.statusText)){
        setTimeout(() => {
          console.log(error.message);
          // loaderService.hide();
        }, 1000);
       }else if([404,403,500,502,401].includes(error.status)){
        setTimeout(() => {
          console.log(error.message);
          // loaderService.hide();
        }, 1000);
       }
       return throwError(()=>{error}) 
    })
  )
};


