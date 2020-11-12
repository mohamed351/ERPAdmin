import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as env from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private cookie:CookieService) { }

  IsAuthenticated(){
     if(localStorage.getItem("userToken") == null)
       return false;
     else
       return true;
  }

  Login(userName:string, password:string){
    let body = new URLSearchParams();
    body.set('username', userName);
    body.set('password', password);
    body.set('grant_type',"password");
   
   return this.http.post(`${env.environment.URL}/token`,"userName=" + encodeURIComponent(userName) +
   "&password=" + encodeURIComponent(password) +
   "&grant_type=password", {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}).pipe(map((user:any)=> {
    
      if(user && user.access_token){
          localStorage.setItem("userToken", JSON.stringify(user));
          this.cookie.set("SingleSignOn", user.cookieValue);
        
      }
    }));
  }

  LogOut(){
    localStorage.removeItem("userToken");
     this.cookie.deleteAll();
  }
  GetToken(){
    return JSON.parse(localStorage.getItem("userToken"));
  }
}


