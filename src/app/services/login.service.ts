import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = "http://localhost/api/login/student_login.php";
  adminUrl = "http://localhost/api/login/admin_login.php";
  
  loginState = false
  adminState = false

  constructor( private http:HttpClient)  { }

  // for student login 
  get islogin() {
    return this.loginState
  }

  setLoginState( value: boolean ) {
    this.loginState = value
  }

  loginStudent( info ) {
    return this.http.post( this.loginUrl , info );
  }


  // for admin login
  loginAdmin( info ) {
    return this.http.post( this.adminUrl , info );
  }

  get isAdmin() {
    return this.adminState
  }

  setAdminState( value: boolean ) {
    this.adminState = value
  }

}
