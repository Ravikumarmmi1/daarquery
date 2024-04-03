import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class QuerybuilderService {

  isNotAvailable:boolean=true;

  constructor(private httpClient: HttpClient) { }
    public saveQuery(data: any): Observable<any> {
      const token=localStorage.getItem('_jtoken');
      const httpHeaders = new HttpHeaders({'Authorization':`Bearer ${token}`}); 
      return this.httpClient.post<any>(environment.domain+'/pipeline/queryInfo' , data,/* { headers: httpHeaders } */);   
    }

    public updateQuery(data: any,qid:any): Observable<any> {
      /* console.log(qid);
      console.log(data); */
      /* const token=localStorage.getItem('_jtoken');
      const httpHeaders = new HttpHeaders({'Authorization':`Bearer ${token}`});  */
      return this.httpClient.put<any>(environment.domain+`/pipeline/queryInfo/${qid}` , data,/* { headers: httpHeaders } */);   
    }

    public getQueryList(page:Number,perPage:Number): Observable<any> {
      /* this.isNotAvailable=false; */
      return this.httpClient.get<any>(environment.domain+'/pipeline/queryInfo?page='+page+'&perPage='+perPage);
    }

    public getSingleQueryInfo(id: string): Observable<any> {
      return this.httpClient.get<any>(environment.domain+'/pipeline/queryInfo?queryId='+id);
    }

    public getQueryResponce(id: string): Observable<any> {
      return this.httpClient.get<any>(environment.domain+'/pipeline/queryResponse?queryId='+id);
    }
}