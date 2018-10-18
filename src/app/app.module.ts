import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ManagementComponent } from './management/management.component';
import { RouterModule, Routes } from '@angular/router';
import { GenerateKeyComponent } from './generate-key/generate-key.component';
import { TeachingStaffComponent } from './teaching-staff/teaching-staff.component';

const routes:Routes = [
  { path :'' , redirectTo:'login' ,pathMatch:'full'},
  { path :'login' ,component: LoginComponent},
  { path :'admin' ,component: AdminComponent },
  { path :'evalution' ,component: EvaluationComponent },
  { path :'generateKey' ,component: GenerateKeyComponent },
  { path :'management' ,component: ManagementComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EvaluationComponent,
    ManagementComponent,
    GenerateKeyComponent,
    TeachingStaffComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
