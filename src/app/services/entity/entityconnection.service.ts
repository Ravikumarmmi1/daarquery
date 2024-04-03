import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityconnectionService {
  isNotAvailable:boolean=true;
  constructor(private httpClient: HttpClient) { }

    /* entity Connection start */
    public saveEntity(data: any): Observable<any> {
      const httpHeaders = new HttpHeaders({'Accept': 'application/json'});  
      return this.httpClient.post<any>(environment.domain+'/pipeline/entityConnection',data,{ headers: httpHeaders });   
    }

    public updateEntity(data: any, id:any): Observable<any> {
      const httpHeaders = new HttpHeaders({'Accept': 'application/json'});  
      return this.httpClient.put<any>(environment.domain+'/pipeline/entityConnection/'+id, data,{ headers: httpHeaders });   
    }

    public getAllEntity(): Observable<any> {
      return this.httpClient.get(environment.domain+'/pipeline/entityConnection');
    }

    public delete(id:number){
      return this.httpClient.delete(environment.domain+'/pipeline/entityConnection/' + id);
    }
    /* entity Connection end */



    /* entity Connection Contract start */
    public saveEntityContract(data: any): Observable<any> {
      const httpHeaders = new HttpHeaders({'Accept': 'application/json'});  
      return this.httpClient.post<any>(environment.domain+'/pipeline/entityConnectionContract?primaryInput='+data.primaryInput+'&primaryOutput='+data.primaryOutput+'&projectName='+data.projectName+'',{ headers: httpHeaders });   
    }

   /*  public updateEntityContract(data: any, id:any): Observable<any> {
      const httpHeaders = new HttpHeaders({'Accept': 'application/json'});  
      return this.httpClient.put<any>(environment.domain+'/pipeline/entityConnectionContract/'+id, data,{ headers: httpHeaders });   
    } */

    public getAllContract(): Observable<any> {
      return this.httpClient.get(environment.domain+'/pipeline/entityConnectionContract');
    }

    public deleteContract(id:number){
      return this.httpClient.delete(environment.domain+'/pipeline/entityConnectionContract/' + id);
    }
    /* entity Connection Contract end */


















    // public updateEntity(data: any,qid:any): Observable<any> {
    //   return this.httpClient.put<any>(environment.domain+`/dashboard/queryInfo/${qid}` , data,/* { headers: httpHeaders } */);   
    // }

    // public getEntityList(page:Number,perPage:Number): Observable<any> {
    //   /* this.isNotAvailable=false; */
    //   return this.httpClient.get<any>(environment.domain+'/dashboard/queryInfo?page='+page+'&perPage='+perPage);
    // }

    // public getSingleQueryInfo(id: string): Observable<any> {
    //   return this.httpClient.get<any>(environment.domain+'/dashboard/queryInfo?queryId='+id);
    // }

    // public getQueryResponce(id: string): Observable<any> {
    //   return this.httpClient.get<any>(environment.domain+'/dashboard/queryResponse?queryId='+id);
    // }
}