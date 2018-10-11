import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginOfprofessorsComponent } from './login-ofprofessors/login-ofprofessors.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginOfprofessorsComponent
   
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
