import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  info = {
    user: '',
    password: ''
  }
  constructor(  private router:Router, 
                private loginService:LoginService ) { }

  ngOnInit() {

  }

  checkLoginInfo() {
    
    console.log(this.info)
    this.loginService.loginAdmin( this.info )
    .subscribe ( data => {

      if ( data["success"] ) {  // if user founded

        this.loginService.setAdminState(true)
        localStorage.setItem( "admin" , "true" )
        this.router.navigate(["/management"])

      } else {                 // if user not found 
        window.alert("تأكد من ان كل المعلومات التي ادخلتها صحيحة ")
      }
    })
  }

  gerUser( event ) {
    this.info.user = event.target.value
  }

  gerPassword( event ) {
    this.info.password = event.target.value
  }
}
