import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../api/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService) {
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if(this.authService.IsAuthenticated()){
            let currentUser = this.authService.GetToken();
            if(currentUser.access_token){
                req =  req.clone({
                    setHeaders:{
                        Authorization:`Bearer  ${currentUser.access_token}`     
                    }
                });
                return next.handle(req);
            }
            else
            {
                return next.handle(req);
            }
       }
       else
       {
           return next.handle(req);
       }
    }
}