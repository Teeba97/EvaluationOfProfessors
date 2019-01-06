import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(  private loginService: LoginService,
    private router: Router ) {

}


  ngOnInit() {
    
  }

  logOut() {
    
    localStorage.setItem( "admin" , "false")    
    this.loginService.setAdminState(false)
    this.router.navigate(["/login"])

  }
}
