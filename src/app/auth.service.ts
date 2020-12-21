import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";


  constructor(private http:HttpClient,private _router :Router) {}
    
  registerUser(user:any) {
    return this.http.post<any>(this._registerUrl, user)
  }
loginUser(user:any) {
    return this.http.post<any>(this._loginUrl, user)
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  gettoken() {
    return localStorage.getItem('token')
    this._router.navigate(['/events'])
  }
  logoutUser() {
    return localStorage.removeItem('token')
  }
}
