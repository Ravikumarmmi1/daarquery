import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { queryinfoInterceptor } from './interceptors/queryinfo.interceptor';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes/* ,withHashLocation() */),provideHttpClient( withInterceptors([queryinfoInterceptor]))]  
};
