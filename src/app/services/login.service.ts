import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = "http://localhost/api/login/student_login.php";

  loginState = false

  constructor( private http:HttpClient)  { }

  // get and set login State
  get islogin() {
    return this.loginState
  }

  setLoginState( value: boolean ) {
    this.loginState = value
  }
  
  // check login info with database
  loginStudent( info ) {
    return this.http.post( this.loginUrl , info );
  }

}
