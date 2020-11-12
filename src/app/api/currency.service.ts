import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../environments/environment';
import { Currency } from '../model/Currencies';
import { PagerResult, PagerViewModel } from '../model/pager';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http:HttpClient) {


   }
   GetCurrcies<T>(endPoint:string){
     return this.http.get<T>(`${env.environment.URL}${endPoint}`)
   }
   Post<T>(endPoint:string, data:T){
     console.log(data);
     return this.http.post<T>(`${env.environment.URL}${endPoint}`,data);
   }
   GetByID<T, Tkey>(endPoint:string,key:Tkey){
     return this.http.get<T>(`${env.environment.URL}${endPoint}/${key}`);
   }
   Put<T,TKey>(endPoint:string , data:T,id:TKey ){
     return this.http.put(`${env.environment.URL}${endPoint}/${id}`,data);
   }
   Delete<TKey>(endPoint:string , id:TKey){
     return this.http.delete(`${env.environment.URL}${endPoint}/${id}`);
     
   }
   GetByQueryString<T>(endPoint:string,query:string){
     return this.http.get<T>(`${env.environment.URL}${endPoint}${query}`)
   }
   GetDatatable<T>(data: PagerViewModel, endPoint:string) {
    return this.http.get<PagerResult<T>>(`${env.environment.URL}${endPoint}?pageSize=${data.pageSize}&Start=${data.start}`);
  }
}
