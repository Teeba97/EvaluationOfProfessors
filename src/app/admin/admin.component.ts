import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }

  ngOnInit() {

  }

  checkLoginInfo() {
    console.log( this.info.user + " :::: " + this.info.password )
    if ( this.info.user != '' && this.info.password != '' ) {
      if (this.info.user == "admin" && this.info.password == "admin" ) {
        this.router.navigate(["/management"])
      }
    } else { 
      window.alert("يوجد خطأ في اسم المستخدم او كلمة السر")
    }
  }

  gerUser( event ) {
    this.info.user = event.target.value
  }

  gerPassword( event ) {
    this.info.password = event.target.value
  }
}
