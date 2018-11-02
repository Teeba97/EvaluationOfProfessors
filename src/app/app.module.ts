import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ManagementComponent } from './management/management.component';
import { RouterModule, Routes } from '@angular/router';
import { GenerateKeyComponent } from './generate-key/generate-key.component';
import { TeachingStaffComponent } from './teaching-staff/teaching-staff.component';
import { NavComponent } from './nav/nav.component';
import { QuestionsComponent } from './questions/questions.component';


// module
import { HttpClientModule } from '@angular/common/http';


// service
import { LecturersService } from './services/lecturers.service';
import { QuestionsService } from './services/questions.service';
import { KeysService } from './services/keys.service';
import { LoginService } from './services/login.service';
import { EvaluationsService } from './services/evaluations.service';

// Guards 
import { AuthGuard } from './guards/auth.guard';

// angular material 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatIconModule , 
          MatSnackBarModule , 
          MatTooltipModule , 
          MatDialogModule  
        } from '@angular/material';


// Routes
const routes:Routes = [

  { path :''             ,redirectTo:'login' ,pathMatch:'full' },
  { path :'login'        ,component: LoginComponent },
  { path :'admin'        ,component: AdminComponent },
  { path :'evalution'    ,component: EvaluationComponent , canActivate: [AuthGuard] },
  { path :'generateKey'  ,component: GenerateKeyComponent },
  { path :'management'   ,component: ManagementComponent },
  { path :'teachers'     ,component: TeachingStaffComponent },
  { path :'questions'    ,component: QuestionsComponent },
  { path :'**'           ,component: LoginComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EvaluationComponent,
    ManagementComponent,
    GenerateKeyComponent,
    TeachingStaffComponent,
    NavComponent,
    QuestionsComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [
    LecturersService,
    QuestionsService,
    KeysService,
    LoginService,
    AuthGuard,
    EvaluationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
