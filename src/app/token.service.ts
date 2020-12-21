import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req,next) {
    let authservies = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authservies.gettoken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
