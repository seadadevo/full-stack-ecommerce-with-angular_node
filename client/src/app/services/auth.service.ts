import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient, private _router: Router) {
    if(localStorage.getItem('userToken') !== null){
      this.saveUserData()
    }
   }

  userData: any = new BehaviorSubject(null)

  saveUserData() {

    const encodedToken = localStorage.getItem('userToken')
    if(encodedToken) {
      const decodedToken = jwtDecode(encodedToken);
      this.userData.next(decodedToken)
    }
  }

  signup(userData: Object): Observable<any> {
    return this._httpClient.post(
      'http://localhost:5000/api/auth/register' , userData
    )
  }
  signin(userData: Object): Observable<any> {
    return this._httpClient.post(
      'http://localhost:5000/api/auth/login' , userData
    )
  }
  
  logout() {
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._router.navigate(['/login'])
  }

}
