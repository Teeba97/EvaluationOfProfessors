import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ManagementComponent } from './management/management.component';
// import { RouterModule, Routes } from '@angular/router';
import { GenerateKeyComponent } from './generate-key/generate-key.component';

// const routes:Routes = [
  
//   { path :'' , redirectTo:'home' ,pathMatch:'full'},
//   { path :'home' ,component:LoginComponent},
//   { path :'home' ,component:AdminComponent }
// ]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EvaluationComponent,
    ManagementComponent,
    GenerateKeyComponent
   
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
