import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // var 
  loginInfo = {
    dep_id: 0,
    st_id: 0, 
    password: 0
  }

  constructor(  private loginService: LoginService,
                private router:Router ) {

  }

  ngOnInit() {

  }


  // Student Login function ...
  login() {

    this.loginService.loginStudent( this.loginInfo )
      .subscribe ( data => {

        if ( data["success"] ) {  // if user founded

          this.loginService.setLoginState(true)
          this.router.navigate(["/evalution"])

        } else {                 // if user not found 
          console.log("Error")
        }
      })
  }

  // get slected department & stage & password data from html page
  setDepartment( event ) {
    this.loginInfo.dep_id =  event.target.value
  }

  getstage( event ) {
    this.loginInfo.st_id =  event.target.value
  }

  setPassword( event ) {
    this.loginInfo.password =  event.target.value
  }


}

